import { HowToHomePage } from "@/components/home/how-to-home-page";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";

export default function Home() {
  return (
    <main className="shell pb-8">
      <SiteHeader />
      <HowToHomePage />
      <SiteFooter />
    </main>
  );
}
