import Hero from "./hero/Hero";
import ProblemSection from "./problem-section/ProblemSection";
import FeaturesSection from "./feature-section/FeaturesSection";
import HowItWorks from "./working/HowItWorks";
import AnalyticsPreview from "./analytics-preview/AnalyticsPreview";
import TestimonialsSection from "./testimonials/TestimonialsSection";
import CTASection from "./cta-section/CTASection";
import Footer from "./footer/Footer";

export default function HomePage() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="problem">
        <ProblemSection />
      </section>

      <section id="features">
        <FeaturesSection />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="analytics">
        <AnalyticsPreview />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="cta">
        <CTASection />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </>
  );
}