import IntroSection from "@/components/IntroSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import DonationSection from "@/components/DonationSection";
import TeamSection from "@/components/TeamSection";
import { QueryProvider } from "@/components/QueryProvider";

export default function Home() {
  return (
    <QueryProvider>
      <div className="min-h-screen">
        <IntroSection />
        <NewsEventsSection />
        {/* <DonationSection /> */}
        <TeamSection />
      </div>
    </QueryProvider>
  );
}
