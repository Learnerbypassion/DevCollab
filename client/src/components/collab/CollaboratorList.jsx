import { UserMinus } from "lucide-react";

export default function CollaboratorList({ collaborators = [], onRemove }) {
  if (!collaborators.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-[#0c0c1a] p-5 text-sm text-gray-400">
        No collaborators yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {collaborators.map((person) => (
        <div
          key={person._id}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c0c1a] px-4 py-3"
        >
          <div>
            <p className="font-medium text-white">{person.name}</p>
            <p className="text-sm text-gray-400">{person.email}</p>
          </div>

          {onRemove ? (
            <button
              onClick={() => onRemove(person._id)}
              className="flex items-center gap-2 rounded-xl bg-rose-500/15 px-3 py-2 text-sm text-rose-300 transition hover:bg-rose-500/25"
            >
              <UserMinus size={16} />
              Remove
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
