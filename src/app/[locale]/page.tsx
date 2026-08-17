import { getTranslations } from "next-intl/server";
import { Navbar } from "@/widgets/navbar";
import { Hero } from "@/widgets/hero";
import { ProofStrip } from "@/widgets/proof-strip";
import { Verbs } from "@/widgets/verbs";
import { CardBlock } from "@/widgets/card-block";
import { Security } from "@/widgets/security";
import { Pricing } from "@/widgets/pricing";
import { Partners } from "@/widgets/partners";
import { Faq } from "@/widgets/faq";
import { FinalCta, Footer } from "@/widgets/final-cta";

export default async function Home() {
  // schema.org FAQPage — вопросы из блока FAQ
  const t = await getTranslations("faq");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.from({ length: 8 }, (_, i) => ({
      "@type": "Question",
      name: t(`q${i + 1}`),
      acceptedAnswer: { "@type": "Answer", text: t(`a${i + 1}`) },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <Hero />
      <ProofStrip />
      <Verbs />
      <CardBlock />
      <Security />
      <Pricing />
      <Partners />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
