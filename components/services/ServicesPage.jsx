import ServicesHero from "./ServicesHero";
import ServicesOverview from "./ServicesOverview";
import ServiceExplorer from "./ServiceExplorer";
import ProcessSection from "./ProcessSection";
import ValueSection from "./ValueSection";
import ServicesCTA from "./ServicesCTA";

// Assembles the full Services page inside the internal scroll container.
// The scroll pattern matches the case-study pages: the window never scrolls,
// only this container does (cleared via pb-20 on mobile for the bottom nav).
const ServicesPage = () => {
  return (
    <div className="h-full bg-primary/30 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-accent/20 pb-20 xl:pb-0">
      <ServicesHero />
      <ServicesOverview />
      <ServiceExplorer />
      <ProcessSection />
      <ValueSection />
      <ServicesCTA />
    </div>
  );
};

export default ServicesPage;
