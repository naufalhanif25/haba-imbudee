import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import ReasonSection from "./reason-section";
import DocsSection from "./docs-section";
import FeaturesSection from "./features-section";
import FAQSection from "./faq-section";
import OrgSection from "./org-section";
import MapSection from "./map-section";

export default function HomeMainSection() {
    return (
        <main className="w-screen">
            <HeroSection />
            <AboutSection />
            <ReasonSection />
            <FeaturesSection />
            <DocsSection />
            <OrgSection />
            <MapSection />
            <FAQSection />
        </main>
    );
}