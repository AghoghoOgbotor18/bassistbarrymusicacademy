import PrivacyInformation from "./privacyPolicy/PrivacyInformation";
import PrivacyUsage from "./privacyPolicy/PrivacyUsage";
import PrivacyPayments from "./privacyPolicy/PrivacyPayments";
import PrivacySharing from "./privacyPolicy/PrivacySharing";
import PrivacySecurity from "./privacyPolicy/PrivacySecurity";
import PrivacyServices from "./privacyPolicy/PrivacyServices";
import PrivacyUpdates from "./privacyPolicy/PrivacyUpdates";
import PrivacyOverview from "./privacyPolicy/PrivacyOverview";
import PrivacyRights from "./PrivacyRights";

export default function PrivacyPolicyContent() {
    return (
        <>
            <PrivacyOverview />
            <PrivacyInformation />
            <PrivacyUsage />
            <PrivacyPayments />
            <PrivacySharing />
            <PrivacySecurity />
            <PrivacyRights />
            <PrivacyServices />
            <PrivacyUpdates />
        </>
    );
}