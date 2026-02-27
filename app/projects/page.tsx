import { getAllProjects } from "@/_projects";
import { PageContainer } from "@/components/page-container";
import { ProjectList } from "@/components/project-list";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <PageContainer>
      <ProjectList projects={projects} />
    </PageContainer>
  );
}
