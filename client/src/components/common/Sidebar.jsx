import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  Folder,
  Settings,
  ChevronRight,
  ChevronLeft,
  Handshake
} from "lucide-react";
export default function Sidebar({ collapsed, setCollapsed }) {
  const links = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Projects", icon: Folder, path: "/projects" },
  {name:"Collabs", icon: Handshake, path:"/collabs"},
  { name: "Settings", icon: Settings, path: "/settings" },
];
  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 260 }}
      className="h-full bg-[#0b0b1f]/80 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col justify-between"
    >
      
      {/* Top */}
      <div>
        <div className="flex items-center justify-between mb-10">
          {!collapsed && (
            <h1 className="text-xl font-bold text-cyan-400 tracking-widest">
              DEV-COLLAB
            </h1>
          )}

          {/* Collapse Button (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, i) => {
            const Icon = link.icon;

            return (
              <NavLink key={i} to={link.path}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                    ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} />

                    {!collapsed && <span>{link.name}</span>}
                  </motion.div>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {!collapsed && (
        <div className="text-xs text-gray-500 mt-10">
          © DevCollab
        </div>
      )}
    </motion.div>
  );
}