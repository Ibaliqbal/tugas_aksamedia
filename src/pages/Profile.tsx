import { useEffect, useState } from "react";
import { useAuth, type User } from "../context/auth-context";
import { Label } from "../component/ui/label";
import { Input } from "../component/ui/input";
import { Button } from "../component/ui/button";

const Profile = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState<User>(auth.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setFormData(auth.user);
  }, [auth.user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // onUpdateUser(formData);
      auth.updateData(formData);

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setMessage({
        type: "error",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        Profile Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            disabled
            className="mt-1 bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
        </div>

        <div>
          <Label htmlFor="username" required>
            Full Name
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="mt-1"
            disabled={loading}
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default Profile;
