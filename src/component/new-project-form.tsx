"use client";

import type React from "react";
import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type NewProjectFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    title: string;
    description: string;
    deadline: string;
  }) => void;
};

export const NewProjectForm = ({
  isOpen,
  onClose,
  onSubmit,
}: NewProjectFormProps) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.deadline = "Deadline cannot be in the past";
      }
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description && !newErrors.deadline;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit(formData);

      // Reset form
      setFormData({
        title: "",
        description: "",
        deadline: "",
      });

      setErrors({
        title: "",
        description: "",
        deadline: "",
      });

      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        description: "",
        deadline: "",
      });
      setErrors({
        title: "",
        description: "",
        deadline: "",
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Project"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title" required>
            Project Title
          </Label>
          <Input
            id="title"
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
          <Label htmlFor="description" required>
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
            rows={4}
            disabled={loading}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 resize-none ${
              errors.description
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <Label htmlFor="deadline" required>
            Deadline
          </Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            variant={errors.deadline ? "error" : "default"}
            className="mt-1"
            disabled={loading}
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
          )}
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
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
