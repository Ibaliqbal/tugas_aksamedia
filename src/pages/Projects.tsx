import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "../component/ui/button";
import { ConfirmDialog } from "../component/ui/confirm-dialog";
import { EditProjectForm } from "../component/edit-project-form";
import { useProjects, type Project } from "../context/projects-context";
import { ProjectCard } from "../component/project-card";
import { useEffect, useState } from "react";
import { Input } from "../component/ui/input";
import { useDebounce } from "../hooks/useDebounce";
const Projects = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/projects?query=${debouncedSearchTerm}&page=1`);
    }
  }, [debouncedSearchTerm]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {searchParams.get("query")
          ? projects
              .getSearchProjectPaginate(
                searchParams.get("query") || "",
                searchParams.get("page") ? Number(searchParams.get("page")) : 1
              )
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  onEdit={(id: number) => {
                    setSelectedProject(
                      projects.projects.find((p) => p.id === id)
                    );
                    setOpenEditModal(true);
                  }}
                  onDelete={(id: number) => {
                    setDeletingProjectId(id);
                    setIsDeleteConfirmOpen(true);
                  }}
                  {...project}
                />
              ))
          : projects
              .getProjectPaginate(
                searchParams.get("page") ? Number(searchParams.get("page")) : 1
              )
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  onEdit={(id: number) => {
                    setSelectedProject(
                      projects.projects.find((p) => p.id === id)
                    );
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
      <div className="flex gap-1.5 items-center">
        {searchParams.get("page") ? (
          Number(searchParams.get("page")) === 1 ? null : (
            <Link
              to={
                searchParams.get("query")
                  ? `?query=${debouncedSearchTerm}&page=${
                      Number(searchParams.get("page")) - 1
                    }`
                  : `?page=${Number(searchParams.get("page")) - 1}`
              }
            >
              <Button>Prev</Button>
            </Link>
          )
        ) : null}
        <Link
          to={
            searchParams.get("query")
              ? `?query=${debouncedSearchTerm}&page=${
                  searchParams.get("page")
                    ? Number(searchParams.get("page")) + 1
                    : 1 + 1
                }`
              : `?page=${
                  searchParams.get("page")
                    ? Number(searchParams.get("page")) + 1
                    : 1 + 1
                }`
          }
        >
          <Button>Next</Button>
        </Link>
      </div>
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
    </div>
  );
};

export default Projects;
