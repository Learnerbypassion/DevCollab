import API from "./axios";

export const register = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};
export const verifyEmailOtp = async (data) => {
  const res = await API.post("/auth/verify-email", data);
  return res.data;
};
export const resendEmailOtp = async (data) => {
  const res = await API.post("/auth/resend-otp", data);
  return res.data;
};
export const forgotPassword = async (data) => {
  const res = await API.post("/auth/forgot-password", data);
  return res.data;
};
export const validateForgotOtp = async (data) => {
  const res = await API.post("/auth/validate-forgot-password-otp", data);
  return res.data;
};

export const resendForgotOtp = async (data) => {
  const res = await API.post("/auth/resend-otp", data);
  return res.data;
};

export const createNewPassword = async (data) => {
  const res = await API.post("/auth/create-new-password", data);
  return res.data;
};