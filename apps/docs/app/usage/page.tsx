import { CodexSkillCallout } from "../../components/codex-skill-callout";
import { SectionIntro } from "../../components/docs-section";
import { UsageBrowser } from "../../components/usage-browser";

export default function UsagePage() {
  return (
    <>
      <SectionIntro
        eyebrow="Usage"
        title="Classic docs flow with a living preview and a ready-to-paste snippet for each component."
        description="Browse the component index from the left rail, jump to a section, then compare the starter code with its rendered output without leaving the page. The same patterns also ship inside the bundled Marginalia Codex skill."
      />

      <CodexSkillCallout />

      <UsageBrowser />
    </>
  );
}
