import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Modal } from "./modal";
import type { Project } from "../context/projects-context";

type EditProjectFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    id: number;
    title: string;
    description: string;
    deadline: string;
    isCompleted: boolean;
  }) => void;
  project: Project | undefined;
};

export const EditProjectForm = ({
  isOpen,
  onClose,
  onSubmit,
  project,
}: EditProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    isCompleted: false,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  // Populate form when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description || "",
        deadline: project.deadline,
        isCompleted: project.isCompleted,
      });
    }
  }, [project]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      deadline: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description && !newErrors.deadline;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !project) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit({
        id: project.id,
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        isCompleted: formData.isCompleted,
      });

      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setErrors({
        title: "",
        description: "",
        deadline: "",
      });
      onClose();
    }
  };

  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Project" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="edit-title" required>
            Project Title
          </Label>
          <Input
            id="edit-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            variant={errors.title ? "error" : "default"}
            placeholder="Enter project title"
            className="mt-1"
            disabled={loading}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <Label htmlFor="edit-description" required>
            Description
          </Label>
          <textarea
            id="edit-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
            rows={4}
            disabled={loading}
            className={`w-full rounded-lg border bg-white dark:bg-gray-800 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 resize-none ${
              errors.description
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 dark:text-gray-50 dark:placeholder-gray-400"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <Label htmlFor="edit-deadline" required>
            Deadline
          </Label>
          <Input
            id="edit-deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            variant={errors.deadline ? "error" : "default"}
            className="mt-1"
            disabled={loading}
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-3">
            <input
              id="edit-completed"
              name="isCompleted"
              type="checkbox"
              checked={formData.isCompleted}
              onChange={handleInputChange}
              disabled={loading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-blue-600 dark:checked:border-transparent"
            />
            <Label htmlFor="edit-completed" className="mb-0">
              Mark as completed
            </Label>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            Check this box if the project has been completed
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Updating..." : "Update Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
