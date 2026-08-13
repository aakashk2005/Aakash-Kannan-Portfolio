import Head from "next/head";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
} from "../../data/projects";
import CaseStudyPage from "../../components/CaseStudyPage";
import { getSiteUrl } from "../../utils/seo";

export async function getStaticPaths() {
  const paths = getProjectSlugs().map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { notFound: true };
  const { prev, next } = getAdjacentProjects(params.slug);
  return { props: { project, prev, next } };
}

const ProjectCaseStudy = ({ project, prev, next }) => {
  const siteUrl = getSiteUrl();
  const pageTitle = `${project.title} — ${project.category} Case Study | Aakash Kannan`;
  const pageUrl = `${siteUrl}/work/${project.slug}`;
  const absoluteImage = `${siteUrl}${project.image}`;

  const projectKeywords = [
    project.title,
    project.category,
    ...(project.focus || []),
    ...(project.tools || []).map((t) => t.name || t),
    "Aakash Kannan",
    "Case Study",
    "UX Design",
    "Web Development",
  ].join(", ");

  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta name="description" content={project.tagline} key="description" />
        <meta name="keywords" content={projectKeywords} key="keywords" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} key="canonical" />

        {/* OpenGraph / Social Metadata */}
        <meta property="og:title" content={pageTitle} key="og-title" />
        <meta property="og:description" content={project.tagline} key="og-description" />
        <meta property="og:type" content="article" key="og-type" />
        <meta property="og:image" content={absoluteImage} key="og-image" />
        <meta property="og:url" content={pageUrl} key="og-url" />
        <meta property="og:site_name" content="Aakash Kannan" key="og-site-name" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
        <meta name="twitter:title" content={pageTitle} key="twitter-title" />
        <meta name="twitter:description" content={project.tagline} key="twitter-description" />
        <meta name="twitter:image" content={absoluteImage} key="twitter-image" />

        {/* Project Case Study Structured Data */}
        <script
          type="application/ld+json"
          key="jsonld-case-study"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": project.title,
              "headline": pageTitle,
              "description": project.tagline,
              "image": absoluteImage,
              "author": {
                "@type": "Person",
                "name": "Aakash Kannan",
                "url": siteUrl
              },
              "creator": {
                "@type": "Person",
                "name": "Aakash Kannan",
                "url": siteUrl
              },
              "genre": project.category,
              "url": pageUrl
            })
          }}
        />
      </Head>
      <CaseStudyPage project={project} prev={prev} next={next} />
    </>
  );
};

export default ProjectCaseStudy;
