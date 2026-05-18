// SNIPPET: HeroSection — Landing page hero
// Customize: headline, subheadline, CTA text, gradient colors
// onCTA: wire to navigate('/dashboard') or open signup modal

export default function HeroSection({
  headline = "The smarter way to [do X]", // PLACEHOLDER: headline
  subheadline = "Built for [WHO], [APP_NAME] helps you [BENEFIT] without [PAIN POINT].", // PLACEHOLDER
  ctaText = "Get Started Free",
  onCTA = () => console.log("CTA clicked"), // STUB: connect to auth or dashboard
  badge = "🏆 Hackathon Demo", // Remove in production
}) {
  return (
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Badge */}
      {badge && (
        <span className="mb-4 inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
          {badge}
        </span>
      )}

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
        {headline}
      </h1>

      {/* Subheadline */}
      <p className="mt-4 text-lg text-gray-500 max-w-xl">
        {subheadline}
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button
          onClick={onCTA}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md"
        >
          {ctaText}
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          See Demo
        </button>
      </div>

      {/* Social proof placeholder */}
      <p className="mt-8 text-sm text-gray-400">
        Trusted by <span className="font-semibold text-gray-600">200+ users</span> {/* PLACEHOLDER */}
      </p>

      {/* Hero image placeholder */}
      <div className="mt-12 w-full max-w-3xl h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border border-indigo-200 flex items-center justify-center">
        <span className="text-gray-400 text-sm">PLACEHOLDER: app screenshot / illustration</span>
      </div>
    </section>
  );
}
