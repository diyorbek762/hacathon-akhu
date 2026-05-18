-- StudyMatch Database Schema

-- 1. Profiles (synced with auth.users via trigger)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  university TEXT,
  department TEXT,
  bio TEXT DEFAULT '',
  interests TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. Circles (channels)
CREATE TABLE IF NOT EXISTS circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '📡',
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE circles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circles are viewable by everyone"
  ON circles FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create circles"
  ON circles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Creator can update their circle"
  ON circles FOR UPDATE USING (auth.uid() = created_by);

-- 3. Circle Members
CREATE TABLE IF NOT EXISTS circle_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);

ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members visible to all"
  ON circle_members FOR SELECT USING (true);

CREATE POLICY "Users can join circles"
  ON circle_members FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave circles"
  ON circle_members FOR DELETE USING (auth.uid() = user_id);

-- 4. Circle Messages (channel feed — Realtime enabled)
CREATE TABLE IF NOT EXISTS circle_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE circle_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circle messages visible to members"
  ON circle_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM circle_members
      WHERE circle_members.circle_id = circle_messages.circle_id
      AND circle_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can post to circles"
  ON circle_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND EXISTS (
      SELECT 1 FROM circle_members
      WHERE circle_members.circle_id = circle_messages.circle_id
      AND circle_members.user_id = auth.uid()
      AND circle_members.role = 'admin'
    )
  );

ALTER TABLE circle_messages REPLICA IDENTITY FULL; -- Required for Realtime

-- 5. Direct Messages (1-on-1)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

ALTER TABLE messages REPLICA IDENTITY FULL; -- Required for Realtime

-- 6. Matches
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_id_2 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
  matched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id_1, user_id_2)
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see their matches"
  ON matches FOR SELECT
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- 7. Availability
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  time_slot TEXT NOT NULL CHECK (time_slot IN ('morning', 'afternoon', 'evening')),
  status TEXT NOT NULL DEFAULT 'free' CHECK (status IN ('free', 'busy', 'maybe')),
  UNIQUE(user_id, day_of_week, time_slot)
);

ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Availability visible to all"
  ON availability FOR SELECT USING (true);

CREATE POLICY "Users can manage their availability"
  ON availability FOR ALL USING (auth.uid() = user_id);

-- Enable Realtime for circle_messages and messages
ALTER PUBLICATION supabase_realtime ADD TABLE circle_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Note: Seed circles will be created via a script after the first user signs up
-- to ensure created_by FK references a valid profile.
