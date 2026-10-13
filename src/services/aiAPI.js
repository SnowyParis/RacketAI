import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export async function analyseCV(cvFile, jobDescription) {
  const formData = new FormData();

  formData.append("cv", cvFile);
  formData.append("jobDescription", jobDescription);

  const response = await API.post("/ai/analyse", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function generateTailoredCV(cvFile, jobDescription) {
  const formData = new FormData();

  formData.append("cv", cvFile);
  formData.append("jobDescription", jobDescription);

  const response = await API.post("/ai/tailored-cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function generateCoverLetter({
  cvFile,
  jobTitle,
  company,
  hiringManager,
  tone,
  additionalInfo,
  useCVAnalysis,
  cvAnalysis,
}) {
  const formData = new FormData();

  formData.append("jobTitle", jobTitle);
  formData.append("company", company);
  formData.append("hiringManager", hiringManager || "");
  formData.append("tone", tone);
  formData.append("additionalInfo", additionalInfo || "");
  formData.append("useCVAnalysis", String(useCVAnalysis));

  if (cvAnalysis) {
    formData.append("cvAnalysis", JSON.stringify(cvAnalysis));
  }

  if (cvFile) {
    formData.append("cv", cvFile);
  }

  const response = await axios.post(
    "http://localhost:5000/api/ai/cover-letter",
    formData,
  );

  return response.data;
}

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/ai",
// });

// //send data to the server
// export const analyseCV = async ({ cvFile, jobDescription }) => {
//   const formData = new FormData();

//   formData.append("cv", cvFile);
//   formData.append("jobDescription", jobDescription);

//   //a post request is made using axios.post to send the data to the API
//   //pass the payload object as the second argument
//   const response = await API.post("/analyse", formData,
//   {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   //the response is either the data being requested or an error
//   return response.data;
// };

// export const tailorCV = async (data) => {
//   //calls tailorCV in aiController through aiRoutes
//   const response = await API.post("/tailor", data);
//   return response.data;
// };

// export const generateCoverLetter = async (data) => {
//   const response = await API.post("/cover-letter", data);
//   return response.data;
// };
