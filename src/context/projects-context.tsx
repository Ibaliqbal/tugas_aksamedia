import React, { useEffect } from "react";

export type Project = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  deadline: string;
};

type ProjectsContextType = {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (projectId: number) => void;
  updateProject: (project: Project) => void;
  getProjectPaginate: (page: number) => Project[];
  getSearchProjectPaginate: (search: string, page: number) => Project[];
  getRecentProjects: () => Project[];
};

const ProjectsContext = React.createContext<ProjectsContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = () => {
  const context = React.useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const ProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = React.useState<Project[]>(
    localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects")!)
      : []
  );

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const removeProject = (projectId: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const updateProject = (project: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
  };

  const getProjectPaginate = (page: number): Project[] => {
    const pageSize = 10;
    return projects.slice((page - 1) * pageSize, page * pageSize);
  };

  const getSearchProjectPaginate = (
    search: string,
    page: number
  ): Project[] => {
    const filteredProjects = projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    return filteredProjects.slice((page - 1) * 10, page * 10);
  };

  const getRecentProjects = () => {
    return projects.slice(0, 5);
  };

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        removeProject,
        updateProject,
        getProjectPaginate,
        getSearchProjectPaginate,
        getRecentProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
