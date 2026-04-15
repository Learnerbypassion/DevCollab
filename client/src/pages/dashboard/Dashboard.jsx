// src/pages/dashboard/Dashboard.jsx

export default function Dashboard() {
  const stats = [
    { title: "Profile Completion", value: "70%" },
    { title: "Projects", value: "5" },
    { title: "Collaborations", value: "3" },
    { title: "Requests", value: "2" },
  ];

  return (
    <div className="space-y-6">

      {/* 👋 Welcome */}
      <h1 className="text-2xl font-semibold text-white">
        Welcome back 👋
      </h1>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-[#0c0c1a] p-4 rounded-xl border border-white/10"
          >
            <p className="text-gray-400 text-sm">{item.title}</p>
            <h2 className="text-2xl font-semibold mt-1">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* ⚡ Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[#0c0c1a] p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold">Complete Profile</h3>
          <p className="text-gray-400 text-sm mt-1">
            Add skills, bio & links
          </p>
          <button className="mt-4 bg-indigo-600 px-3 py-2 rounded-lg text-sm">
            Complete
          </button>
        </div>

        <div className="bg-[#0c0c1a] p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold">View Requests</h3>
          <p className="text-gray-400 text-sm mt-1">
            You have 2 pending requests
          </p>
          <button className="mt-4 bg-indigo-600 px-3 py-2 rounded-lg text-sm">
            Open
          </button>
        </div>

        <div className="bg-[#0c0c1a] p-4 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold">Create Project</h3>
          <p className="text-gray-400 text-sm mt-1">
            Start a new collaboration
          </p>
          <button className="mt-4 bg-indigo-600 px-3 py-2 rounded-lg text-sm">
            Create
          </button>
        </div>
      </div>

      {/* 📁 Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-white">
          Your Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {["AI Chat App", "DevCollab", "Portfolio"].map((proj, i) => (
            <div
              key={i}
              className="bg-[#0c0c1a] p-4 rounded-xl border border-white/10"
            >
              <h3 className="text-lg font-semibold">{proj}</h3>
              <p className="text-sm mt-2 text-green-400">
                Active
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 📈 Activity */}
      <div className="bg-[#0c0c1a] p-4 rounded-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-2">Activity</h2>
        <p className="text-gray-400">
          Graph coming soon...
        </p>
      </div>

    </div>
  );
}