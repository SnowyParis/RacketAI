const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function generateGeminiResponse(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const response = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],

      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini response:", text);

    throw new Error("Gemini returned invalid JSON.");
  }
}


async function analyseCV(cvText, jobDescription) {
  const prompt = `
You are an expert recruitment and CV analysis assistant.

Analyse the candidate's CV against the provided job description.

CANDIDATE CV:
----------------
${cvText}
----------------

JOB DESCRIPTION:
----------------
${jobDescription}
----------------

Return ONLY valid JSON using exactly this structure:

{
  "matchScore": 0,
  "summary": "",
  "strongSkills": [],
  "missingSkills": [],
  "recommendations": [
    {
      "title": "",
      "description": "",
      "priority": "High"
    }
  ],
  "experienceMatch": "",
  "educationMatch": "",
  "keywordMatch": [],
  "atsSuggestions": []
}

Rules:

1. matchScore must be a number from 0 to 100.
2. strongSkills must contain skills explicitly supported by the CV.
3. missingSkills must contain skills required or strongly preferred by the job description that are not clearly demonstrated in the CV.
4. Do not invent qualifications, experience or skills.
5. recommendations should be practical and specific.
6. atsSuggestions should explain how the CV could better match the job description.
7. Keep the analysis professional and useful for a job applicant.
8. Return JSON only.`;

  return generateGeminiResponse(prompt);
}


async function generateTailoredCV(cvText, jobDescription) {
  const prompt = `
You are an expert CV writer.

Create a tailored CV based ONLY on the candidate's existing CV and the job description.

CANDIDATE CV:
----------------
${cvText}
----------------

JOB DESCRIPTION:
----------------
${jobDescription}
----------------

Do not invent experience, qualifications, employers, projects or skills.

Return ONLY JSON:

{
  "professionalSummary": "",
  "skills": [],
  "experience": [
    {
      "jobTitle": "",
      "company": "",
      "description": []
    }
  ],
  "education": [],
  "projects": [],
  "additionalSections": []
}`;

  return generateGeminiResponse(prompt);
}



async function generateCoverLetter({
  cvText = "",
  cvAnalysis = null,
  jobTitle,
  company,
  hiringManager = "",
  tone = "Professional",
  additionalInfo = "",
}) {
  const prompt = `
  You are a professional career-writing assistant.

  Write a tailored cover letter for the candidate.

  JOB TITLE:
  ${jobTitle}

  COMPANY:
  ${company}

  HIRING MANAGER:
  ${hiringManager || "Not provided"}

  TONE:
  ${tone}

  ADDITIONAL INFORMATION:
  ${additionalInfo || "None provided"}

  EXTRACTED CV:
  ${cvText || "No CV uploaded"}

  PREVIOUS CV ANALYSIS:
  ${cvAnalysis ? JSON.stringify(cvAnalysis) : "Not provided"}

  INSTRUCTIONS:

  1. Address the hiring manager by name when supplied.
    Otherwise, use "Dear Hiring Manager".
  2. Use the requested tone throughout the letter.
  3. Explain why the candidate is interested in the role and company,
    using only information supported by the supplied context.
  4. Highlight relevant skills, qualifications, projects and experience.
  5. Include the additional information naturally where appropriate.
  6. Do not invent qualifications, work experience, achievements,
    company facts, or personal details.
  7. If information is missing, use general but truthful wording.
  8. Do not include fabricated contact details or dates.
  9. Produce a polished letter with a greeting, opening paragraph,
    relevant body paragraphs, closing paragraph and sign-off.
  10. Return ONLY valid JSON in this format:

  {
    "coverLetter": "Complete cover letter text"
  }`;

  return generateGeminiResponse(prompt);
}


module.exports = {
  analyseCV,
  generateTailoredCV,
  generateCoverLetter,
};
