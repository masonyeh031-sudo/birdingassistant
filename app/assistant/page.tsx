import { AssistantExperience } from "@/components/assistant/assistant-experience";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function AssistantPage() {
  return (
    <main className="shell pb-10">
      <SiteHeader />
      <AssistantExperience />
      <SiteFooter />
    </main>
  );
}
