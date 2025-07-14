import { Outlet } from "react-router";
import { Navbar } from "../component/navbar";
import { useAuth } from "../context/auth-context";

const MainLayout = () => {
  const auth = useAuth();
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar user={auth.user} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
