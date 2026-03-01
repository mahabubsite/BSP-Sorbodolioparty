import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import NewsTicker from "@/components/NewsTicker";
import AchievementsSection from "@/components/AchievementsSection";
import QuickLinksSection from "@/components/QuickLinksSection";
import ManifestoPreview from "@/components/ManifestoPreview";
import SloganBanner from "@/components/SloganBanner";
import FaqPreview from "@/components/FaqPreview";
import OpinionPoll from "@/components/OpinionPoll";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <NewsTicker />
      <AchievementsSection />
      <QuickLinksSection />
      <ManifestoPreview />
      <OpinionPoll />
      <SloganBanner />
      <FaqPreview />
    </PageLayout>
  );
};

export default Index;
