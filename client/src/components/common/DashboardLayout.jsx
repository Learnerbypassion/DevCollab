import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import CompleteProfileModal from "../profile/CompleteProfileModal";
import { getProfile } from "../../api/user.api";

export default function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);

  const fetchUser = async () => {
    const res = await getProfile();
    setUser(res.data.user);
  };

  useEffect(() => {
    fetchUser();

    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#050510] text-white overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 md:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          collapsed={false}
          setCollapsed={setCollapsed}
          onLinkClick={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar
          user={user || {}}
          onProfileClick={() => setOpenProfile(true)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

      {/* Modal */}
      {openProfile && user && (
        <CompleteProfileModal
          user={user}
          onClose={() => setOpenProfile(false)}
          refresh={fetchUser}
        />
      )}
    </div>
  );
}