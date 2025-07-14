import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import MainLayout from "./layouts/main-layout.tsx";
import Profile from "./pages/Profile.tsx";
import Projects from "./pages/Projects.tsx";
import { ProjectsProvider } from "./context/projects-context.tsx";
import { ThemeProvider } from "./component/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <ProjectsProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/projects" element={<Projects />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </ProjectsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
