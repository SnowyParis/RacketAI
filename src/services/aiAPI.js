import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
});

export const analyseCV = async (data) => {
  const response = await API.post("/analyse", data);
  return response.data;
};

export const tailorCV = async (data) => {
  const response = await API.post("/tailor", data);
  return response.data;
};

export const generateCoverLetter = async (data) => {
  const response = await API.post("/cover-letter", data);
  return response.data;
};