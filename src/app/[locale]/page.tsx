import { Navbar } from "@/widgets/navbar";
import { Hero } from "@/widgets/hero";
import { TrustStrip } from "@/widgets/trust-strip";
import { HowItWorks } from "@/widgets/how-it-works";
import { Ecosystem } from "@/widgets/ecosystem";
import { Security } from "@/widgets/security";
import { Personas } from "@/widgets/personas";
import { Faq } from "@/widgets/faq";
import { FinalCta, Footer } from "@/widgets/final-cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Ecosystem />
      <Security />
      <Personas />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}