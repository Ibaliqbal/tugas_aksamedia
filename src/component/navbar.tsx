import { Link } from "react-router";
import { useAuth } from "../context/auth-context";
import { Dropdown, DropdownItem } from "./ui/dropdown";
import { useTheme } from "./theme-provider";

type NavbarProps = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export const Navbar = ({ user }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const auth = useAuth();

  return (
    <nav className="dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                <Link to="/">MyApp</Link>
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <Dropdown
              trigger={
                <div className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {getInitials(user.username)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {user.username}
                    </p>
                    {user.email && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              }
            >
              <Link to={"/profile"}>
                <DropdownItem
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                >
                  Profile
                </DropdownItem>
              </Link>

              <Link to={"/projects?page=1"}>
                <DropdownItem
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  }
                >
                  Projects
                </DropdownItem>
              </Link>

              <hr className="my-1 border-gray-200" />

              <DropdownItem
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                icon={
                  theme === "light" ? (
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h1M3 12H2m8.66 14.66l-.707-.707M15.34 8.66l.707-.707M16.66 14.66l.707.707M8.66 8.66l-.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z"
                      />
                    </svg>
                  )
                }
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </DropdownItem>

              <hr className="my-1 border-gray-200" />

              <DropdownItem
                onClick={() => auth.logout()}
                className="text-red-600 hover:bg-red-50"
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                }
              >
                Logout
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};
