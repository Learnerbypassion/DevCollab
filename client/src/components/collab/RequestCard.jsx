export default function RequestCard({ request, onAccept, onReject, isLoading }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <img
            src={
              request.sender?.profileImage ||
              `https://ui-avatars.com/api/?name=${request.sender?.name || "User"}`
            }
            alt={request.sender?.name || "Sender"}
            className="h-11 w-11 rounded-full border border-white/10"
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">{request.sender?.name || "Unknown user"}</h3>
              <span className="rounded-full bg-amber-500/15 px-2 py-1 text-[11px] text-amber-300">
                Pending
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-400">{request.sender?.email || "No email provided"}</p>
            <h4 className="mt-3 text-lg font-semibold text-cyan-300">{request.project?.title || "Untitled project"}</h4>
            <p className="mt-2 text-sm text-gray-400">
              {request.project?.description || "No description provided."}
            </p>
            {request.message ? (
              <p className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200">
                “{request.message}”
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onAccept(request._id)}
            disabled={isLoading}
            className="rounded-xl bg-emerald-500/20 px-3 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Working..." : "Accept"}
          </button>
          <button
            onClick={() => onReject(request._id)}
            disabled={isLoading}
            className="rounded-xl bg-rose-500/20 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
