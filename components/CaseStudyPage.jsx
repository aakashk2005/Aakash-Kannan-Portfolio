import ProjectHero from "./case-study/ProjectHero";
import ProjectOverview from "./case-study/ProjectOverview";
import ChallengeSection from "./case-study/ChallengeSection";
import ProcessTimeline from "./case-study/ProcessTimeline";
import StorySection from "./case-study/StorySection";
import DesignSystem from "./case-study/DesignSystem";

import DevelopmentSection from "./case-study/DevelopmentSection";
import FinalExperience from "./case-study/FinalExperience";
import ReflectionSection from "./case-study/ReflectionSection";
import NextProject from "./case-study/NextProject";

// Renders the full case study for a project from its data. New projects can
// be added purely in data/projects.js — no new page code required.
const CaseStudyPage = ({ project, prev, next }) => {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20 pb-20 xl:pb-0 bg-primary/30">
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      {project.challenge && <ChallengeSection challenge={project.challenge} />}
      {project.process && <ProcessTimeline process={project.process} />}
      {project.story && <StorySection story={project.story} accent={project.accent} />}
      {project.designSystem && <DesignSystem designSystem={project.designSystem} />}

      {project.development && <DevelopmentSection development={project.development} />}
      <FinalExperience project={project} />
      {project.reflection && <ReflectionSection reflection={project.reflection} />}
      <NextProject prev={prev} next={next} />
    </div>
  );
};

export default CaseStudyPage;
