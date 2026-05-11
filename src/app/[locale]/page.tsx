import { Hero } from "@/widgets/hero";
import { TrustStrip } from "@/widgets/trust-strip";
import { Ecosystem } from "@/widgets/ecosystem";
import { Security } from "@/widgets/security";
import { Personas } from "@/widgets/personas";
import { FinalCta, Footer } from "@/widgets/final-cta";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <TrustStrip />
      <Ecosystem />
      <Security />
      <Personas />
      <FinalCta />
      <Footer />
    </div>
  );
}
