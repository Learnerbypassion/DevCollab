import API from "./axios";


export const sendCollabRequest = (projectId, message) =>
  API.post("/collabs/request", { projectId, message });


export const getReceivedRequests = () =>
  API.get("/collabs/received-requests");

export const acceptRequest = (collabId) =>
  API.patch(`/collabs/${collabId}/accept`);

export const rejectRequest = (collabId) =>
  API.patch(`/collabs/${collabId}/reject`);

export const leaveProject = (collabId) =>
  API.patch(`/collabs/${collabId}/leave`);

export const removeCollaborator = (collabId) =>
  API.delete(`/collabs/${collabId}`);

export const getJoinedProjects = () =>
  API.get("/collabs/joined");

export const getProjectCollaborators = (projectId) =>
  API.get(`/collabs/project/${projectId}`);

export default API;