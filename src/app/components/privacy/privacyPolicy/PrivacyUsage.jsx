export default function PrivacyUsage() {
    return (
        <>
            <section>
                <h2 className="mb-4 text-2xl font-semibold text-ebony">
                    3. How We Use Your Information
                </h2>

                <p className="leading-7 text-ebony/80">
                    We may use your information to:
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-6 text-ebony/70">
                    <li>Create and manage your account.</li>
                    <li>Authenticate users and provide password recovery.</li>
                    <li>Provide access to courses and learning services.</li>
                    <li>Process and verify payments.</li>
                    <li>Maintain enrollment and payment records.</li>
                    <li>Respond to support and contact requests.</li>
                    <li>Send relevant transactional communications.</li>
                    <li>Protect the website against abuse and unauthorized activity.</li>
                    <li>Comply with applicable legal obligations.</li>
                </ul>
            </section>

            <section>
                <h2 className="mb-4 text-2xl font-semibold text-ebony">
                    4. Account and Authentication
                </h2>

                <p className="leading-7 text-ebony/70">
                    Account authentication and password management are handled
                    through our authentication service provider. BBMA does not
                    intentionally store user passwords in plain text.
                </p>
            </section>
        </>
    );
}