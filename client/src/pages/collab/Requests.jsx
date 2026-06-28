import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReceivedRequests, acceptRequest, rejectRequest } from "../../api/collab.api";
import RequestCard from "../../components/collab/RequestCard";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await getReceivedRequests();
      setRequests(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (collabId) => {
    try {
      setBusyId(collabId);
      await acceptRequest(collabId);
      await fetchRequests();
    } catch (error) {
      console.error("Failed to accept request", error);
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (collabId) => {
    try {
      setBusyId(collabId);
      await rejectRequest(collabId);
      await fetchRequests();
    } catch (error) {
      console.error("Failed to reject request", error);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Incoming requests</h1>
          <p className="mt-1 text-sm text-gray-400">
            Review collaboration requests sent to you by other developers.
          </p>
        </div>

        <Link
          to="/collabs"
          className="rounded-xl border border-white/10 bg-[#0c0c1a] px-4 py-2 text-sm text-gray-200 transition hover:border-cyan-400/40 hover:text-white"
        >
          Back to hub
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-6 text-sm text-gray-400">
          Loading requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0c0c1a] p-8 text-center text-sm text-gray-400">
          No pending collaboration requests right now.
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <RequestCard
              key={request._id}
              request={request}
              isLoading={busyId === request._id}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
