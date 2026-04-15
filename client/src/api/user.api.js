import API from "./axios";

export const getMe = async () => {
  const res = await API.get("/user/");
  return res.data;
};

export const getUser = async (userName) =>{
    const res = await API.get(`/user/${userName}`);
    return res.data; 
}

export const searchUsers = async (query) => {
  const res = await API.get("/user/search", {
    params: { query },
  });
  return res.data;
};

export const getProfile = () => API.get("/user");
export const completeProfile = (formData) =>
  API.patch("/user/complete-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });