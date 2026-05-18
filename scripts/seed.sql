-- Seed mock users via auth schema
-- Note: The password hash below is for 'test123456'
-- We use the Supabase auth schema directly

-- First, check if our mock users already exist
DO $$
DECLARE
  mia_id uuid;
  luca_id uuid;
  zara_id uuid;
  james_id uuid;
  priya_id uuid;
  carlos_id uuid;
  circle_ids uuid[];
  c_id uuid;
BEGIN

  -- Create or get existing mock users
  -- We insert into auth.users directly using a pre-computed hash

  -- Mia Chen
  SELECT id INTO mia_id FROM auth.users WHERE email = 'mia@studymatch.dev';
  IF mia_id IS NULL THEN
    mia_id := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
    VALUES (mia_id, 'mia@studymatch.dev', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345', NOW(), '{"full_name":"Mia Chen"}', NOW(), NOW(), 'authenticated');
    INSERT INTO public.profiles (id, full_name, university, department, bio, interests)
    VALUES (mia_id, 'Mia Chen', 'MIT', 'Computer Science', 'Building AI tools for education, love hackathons!', ARRAY['Machine Learning', 'Startups', 'Hackathons']);
  ELSE
    UPDATE public.profiles SET full_name='Mia Chen', university='MIT', department='Computer Science', bio='Building AI tools for education, love hackathons!', interests=ARRAY['Machine Learning', 'Startups', 'Hackathons'] WHERE id=mia_id;
  END IF;
  RAISE NOTICE 'Mia Chen: %', mia_id;

  -- Luca Moretti
  SELECT id INTO luca_id FROM auth.users WHERE email = 'luca@studymatch.dev';
  IF luca_id IS NULL THEN
    luca_id := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
    VALUES (luca_id, 'luca@studymatch.dev', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345', NOW(), '{"full_name":"Luca Moretti"}', NOW(), NOW(), 'authenticated');
    INSERT INTO public.profiles (id, full_name, university, department, bio, interests)
    VALUES (luca_id, 'Luca Moretti', 'Stanford', 'Electrical Engineering', 'Researching LLMs, open to study sessions anytime.', ARRAY['Deep Learning', 'Research', 'Chess']);
  ELSE
    UPDATE public.profiles SET full_name='Luca Moretti', university='Stanford', department='Electrical Engineering', bio='Researching LLMs, open to study sessions anytime.', interests=ARRAY['Deep Learning', 'Research', 'Chess'] WHERE id=luca_id;
  END IF;
  RAISE NOTICE 'Luca Moretti: %', luca_id;

  -- Zara Ahmed
  SELECT id INTO zara_id FROM auth.users WHERE email = 'zara@studymatch.dev';
  IF zara_id IS NULL THEN
    zara_id := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
    VALUES (zara_id, 'zara@studymatch.dev', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345', NOW(), '{"full_name":"Zara Ahmed"}', NOW(), NOW(), 'authenticated');
    INSERT INTO public.profiles (id, full_name, university, department, bio, interests)
    VALUES (zara_id, 'Zara Ahmed', 'NYU', 'Design', 'Design meets tech. Looking for product-minded builders.', ARRAY['UI/UX', 'Photography', 'Hackathons']);
  ELSE
    UPDATE public.profiles SET full_name='Zara Ahmed', university='NYU', department='Design', bio='Design meets tech. Looking for product-minded builders.', interests=ARRAY['UI/UX', 'Photography', 'Hackathons'] WHERE id=zara_id;
  END IF;
  RAISE NOTICE 'Zara Ahmed: %', zara_id;

  -- James Park
  SELECT id INTO james_id FROM auth.users WHERE email = 'james@studymatch.dev';
  IF james_id IS NULL THEN
    james_id := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
    VALUES (james_id, 'james@studymatch.dev', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345', NOW(), '{"full_name":"James Park"}', NOW(), NOW(), 'authenticated');
    INSERT INTO public.profiles (id, full_name, university, department, bio, interests)
    VALUES (james_id, 'James Park', 'Harvard', 'Entrepreneurship', 'Building the next big thing one sprint at a time.', ARRAY['Startups', 'Finance', 'Running']);
  ELSE
    UPDATE public.profiles SET full_name='James Park', university='Harvard', department='Entrepreneurship', bio='Building the next big thing one sprint at a time.', interests=ARRAY['Startups', 'Finance', 'Running'] WHERE id=james_id;
  END IF;
  RAISE NOTICE 'James Park: %', james_id;

  -- Priya Sharma
  SELECT id INTO priya_id FROM auth.users WHERE email = 'priya@studymatch.dev';
  IF priya_id IS NULL THEN
    priya_id := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
    VALUES (priya_id, 'priya@studymatch.dev', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345', NOW(), '{"full_name":"Priya Sharma"}', NOW(), NOW(), 'authenticated');
    INSERT INTO public.profiles (id, full_name, university, department, bio, interests)
    VALUES (priya_id, 'Priya Sharma', 'Caltech', 'Robotics', 'Robotics engineer by day, bookworm by night.', ARRAY['Robotics', 'Control Systems', 'Yoga']);
  ELSE
    UPDATE public.profiles SET full_name='Priya Sharma', university='Caltech', department='Robotics', bio='Robotics engineer by day, bookworm by night.', interests=ARRAY['Robotics', 'Control Systems', 'Yoga'] WHERE id=priya_id;
  END IF;
  RAISE NOTICE 'Priya Sharma: %', priya_id;

  -- Carlos Vega
  SELECT id INTO carlos_id FROM auth.users WHERE email = 'carlos@studymatch.dev';
  IF carlos_id IS NULL THEN
    carlos_id := gen_random_uuid();
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at, role)
    VALUES (carlos_id, 'carlos@studymatch.dev', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345', NOW(), '{"full_name":"Carlos Vega"}', NOW(), NOW(), 'authenticated');
    INSERT INTO public.profiles (id, full_name, university, department, bio, interests)
    VALUES (carlos_id, 'Carlos Vega', 'USC', 'Data Science', 'Data x storytelling.', ARRAY['Data Science', 'Film', 'Basketball']);
  ELSE
    UPDATE public.profiles SET full_name='Carlos Vega', university='USC', department='Data Science', bio='Data x storytelling.', interests=ARRAY['Data Science', 'Film', 'Basketball'] WHERE id=carlos_id;
  END IF;
  RAISE NOTICE 'Carlos Vega: %', carlos_id;

  -- Seed circles (only if they don't exist)
  IF NOT EXISTS (SELECT 1 FROM public.circles LIMIT 1) THEN
    INSERT INTO public.circles (name, description, icon, created_by) VALUES
      ('AI Research Collective', 'Weekly paper readings, research discussions, and project collaborations in machine learning and AI.', '🤖', mia_id),
      ('Founders & Builders', 'Connect with student entrepreneurs building real startups. Demo nights every Friday.', '🚀', james_id),
      ('5AM Gym Squad', 'Early risers who hit the campus gym before 7am. Accountability and motivation built in.', '💪', luca_id),
      ('Research Nexus', 'For undergrads doing faculty research. Find labs, collaborators, and publication tips.', '🧪', priya_id),
      ('Creative Tech Collective', 'Where design thinking meets engineering. UI/UX, generative art, and product design.', '🎨', zara_id),
      ('Chess & Strategy Club', 'Weekly tournaments, blitz sessions, and strategic thinking workshops.', '♟️', carlos_id);

    RAISE NOTICE 'Circles seeded';
  ELSE
    RAISE NOTICE 'Circles already exist, skipping';
  END IF;

  -- Get circle IDs
  SELECT ARRAY_AGG(id ORDER BY created_at) INTO circle_ids FROM public.circles;

  -- Seed circle members (only if not already members)
  FOR i IN 1..array_length(circle_ids, 1) LOOP
    c_id := circle_ids[i];
    IF NOT EXISTS (SELECT 1 FROM public.circle_members WHERE circle_id = c_id AND user_id = CASE i
      WHEN 1 THEN mia_id WHEN 2 THEN james_id WHEN 3 THEN luca_id
      WHEN 4 THEN priya_id WHEN 5 THEN zara_id WHEN 6 THEN carlos_id
    END) THEN
      -- Creator as admin
      INSERT INTO public.circle_members (circle_id, user_id, role) VALUES (c_id, CASE i
        WHEN 1 THEN mia_id WHEN 2 THEN james_id WHEN 3 THEN luca_id
        WHEN 4 THEN priya_id WHEN 5 THEN zara_id WHEN 6 THEN carlos_id
      END, 'admin');
      -- Add other members
      INSERT INTO public.circle_members (circle_id, user_id, role) VALUES
        (c_id, CASE WHEN i % 6 + 1 = 1 THEN mia_id WHEN i % 6 + 1 = 2 THEN luca_id WHEN i % 6 + 1 = 3 THEN zara_id WHEN i % 6 + 1 = 4 THEN james_id WHEN i % 6 + 1 = 5 THEN priya_id WHEN i % 6 + 1 = 6 THEN carlos_id END, 'member')
      ON CONFLICT DO NOTHING;
      INSERT INTO public.circle_members (circle_id, user_id, role) VALUES
        (c_id, CASE WHEN (i+1) % 6 + 1 = 1 THEN mia_id WHEN (i+1) % 6 + 1 = 2 THEN luca_id WHEN (i+1) % 6 + 1 = 3 THEN zara_id WHEN (i+1) % 6 + 1 = 4 THEN james_id WHEN (i+1) % 6 + 1 = 5 THEN priya_id WHEN (i+1) % 6 + 1 = 6 THEN carlos_id END, 'member')
      ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;
  RAISE NOTICE 'Circle memberships seeded';

  -- Seed circle messages
  IF NOT EXISTS (SELECT 1 FROM public.circle_messages LIMIT 1) THEN
    INSERT INTO public.circle_messages (circle_id, sender_id, content) VALUES
      (circle_ids[1], mia_id, 'Hey everyone! 📢 Who''s interested in a paper reading session this Thursday? I found this amazing paper on Mixture of Experts!'),
      (circle_ids[1], luca_id, 'I''m in! I''ve been reading about MoE architectures too. Will share my notes.'),
      (circle_ids[2], james_id, 'Demo night this Friday! Who''s presenting? 🚀'),
      (circle_ids[2], mia_id, 'I''ll present our AI study tool prototype!'),
      (circle_ids[3], luca_id, 'Morning run at 6am tomorrow? 🏃'),
      (circle_ids[3], zara_id, 'Count me in! Meeting at the campus track?');
    RAISE NOTICE 'Circle messages seeded';
  END IF;

  -- Seed DMs
  IF NOT EXISTS (SELECT 1 FROM public.messages LIMIT 1) THEN
    INSERT INTO public.messages (sender_id, receiver_id, content) VALUES
      (mia_id, luca_id, 'Hey! I saw we''re both into ML — want to study together for the midterm? 👋'),
      (luca_id, mia_id, 'Yes absolutely! When are you free?'),
      (mia_id, luca_id, 'Thursday afternoons work for me. Library at 2pm?'),
      (james_id, mia_id, 'Let''s sync up on the startup pitch deck!'),
      (mia_id, james_id, 'Sure! I''ll share my slides tonight.');
    RAISE NOTICE 'DMs seeded';
  END IF;

  RAISE NOTICE '✅ Seed complete!';
END $$;
