import Link from "next/link";

export const metadata = {
  title: "Terms of Use | SkillDojo",
  description:
    "Read the SkillDojo Terms of Use for platform rules, acceptable behavior, and service limitations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-black md:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: April 3, 2026</p>

        <div className="mt-8 space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="mt-2 leading-relaxed">
              By using SkillDojo, you agree to these terms. If you do not agree, please stop
              using the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">2. Educational Use</h2>
            <p className="mt-2 leading-relaxed">
              SkillDojo provides educational content for learning Japanese. Content is provided
              for general study purposes and may be updated at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">3. Accounts and Conduct</h2>
            <p className="mt-2 leading-relaxed">
              You are responsible for your account activity. Do not misuse the platform, attempt
              unauthorized access, or interfere with normal operation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">4. Ads and Third-Party Services</h2>
            <p className="mt-2 leading-relaxed">
              SkillDojo may show advertisements through Google AdSense and may use third-party
              services such as Google Sign-In and YouTube embeds. These services may collect
              data according to their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
            <p className="mt-2 leading-relaxed">
              SkillDojo is provided on an "as is" basis without warranties. We are not liable for
              damages resulting from use of the site to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">6. Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about these terms can be sent via the <Link href="/contact" className="font-semibold text-blue-700 hover:text-blue-800">Contact page</Link>.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
          <Link href="/privacy-policy" className="mr-5 hover:text-slate-900">Privacy Policy</Link>
          <Link href="/" className="hover:text-slate-900">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
