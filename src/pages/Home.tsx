import { useAuth } from "../context/auth-context";
import { Button } from "../component/ui/button";
import { NewProjectForm } from "../component/new-project-form";
import { useState } from "react";
import { useProjects, type Project } from "../context/projects-context";
import { ProjectCard } from "../component/project-card";
import { EditProjectForm } from "../component/edit-project-form";
import { ConfirmDialog } from "../component/ui/confirm-dialog";

const Home = () => {
  const auth = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
    null
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const projects = useProjects();
  const deletingProject = projects.projects.find(
    (p) => p.id === deletingProjectId
  );
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome back {auth.user.username}!
      </h1>
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Recents Projects</h1>
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            onClick={() => setOpenModal(true)}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {projects.getRecentProjects().map((project) => (
            <ProjectCard
              key={project.id}
              onEdit={(id: number) => {
                setSelectedProject(projects.projects.find((p) => p.id === id));
                setOpenEditModal(true);
              }}
              onDelete={(id: number) => {
                setDeletingProjectId(id);
                setIsDeleteConfirmOpen(true);
              }}
              {...project}
            />
          ))}
        </div>

        {projects.getRecentProjects().length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <Button variant="primary" onClick={() => setOpenModal(true)}>
              Create New Project
            </Button>
          </div>
        )}
      </div>

      <NewProjectForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => {
          projects.addProject({
            id: Date.now(),
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            isCompleted: false,
          });
        }}
      />
      <EditProjectForm
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSubmit={(data) => {
          projects.updateProject(data);
        }}
        project={selectedProject}
      />
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          if (!deleteLoading) {
            setIsDeleteConfirmOpen(false);
            setDeletingProjectId(null);
          }
        }}
        onConfirm={async () => {
          if (deletingProjectId === null) return;

          setDeleteLoading(true);

          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            projects.removeProject(deletingProjectId);

            setIsDeleteConfirmOpen(false);
            setDeletingProjectId(null);
          } catch (error) {
            console.error("Error deleting project:", error);
          } finally {
            setDeleteLoading(false);
          }
        }}
        title="Delete Project"
        message={
          deletingProject
            ? `Are you sure you want to delete "${deletingProject.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this project?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
      />
    </>
  );
};

export default Home;
