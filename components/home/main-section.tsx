import HeroSection from "./hero-section";
import ReasonSection from "./reason-section";
import DocsSection from "./docs-section";
import FeaturesSection from "./features-section";
import FAQSection from "./faq-section";

export default function HomeMainSection() {
    return (
        <main>
            <HeroSection />
            <ReasonSection />
            <DocsSection />
            <FeaturesSection />
            <FAQSection />
        </main>
    );
}