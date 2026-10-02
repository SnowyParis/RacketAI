const { generateContent } = require("../services/geminiService");

const analyseCV = async (req, res) => {
  try {
    const { cvText, jobDescription } = req.body;

    const prompt = `You are a professional ATS recruiter.
                    Analyse this CV against the job description.

                    Return ONLY valid JSON.

                    {
                        "matchScore": number,
                        "strengths": [],
                        "missingSkills": [],
                        "recommendations": []
                    }

                    CV:
                    ${cvText}

                    Job Description:
                    ${jobDescription}`;

    const response = await generateContent(prompt);

    res.json({
      success: true,
      analysis: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generateCoverLetter = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      hiringManager,
      tone,
      additionalInfo,
      cvText,
    } = req.body;

    const prompt = `Create a ${tone} cover letter.

                    Job Title: ${jobTitle}
                    Company: ${company}
                    Hiring Manager: ${hiringManager}

                    CV:
                    ${cvText}

                    Additional Information:
                    ${additionalInfo}`;

    const response = await generateContent(prompt);

    const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    const analysis = JSON.parse(cleaned);

    res.json(analysis);
};

const tailorCV = async (req, res) => {
  try {
    const { cvText, jobDescription } = req.body;

    const prompt = `Rewrite and optimise this CV for the supplied job description.

                    Return:
                    - Professional Summary
                    - Skills Section
                    - Experience Improvements
                    - ATS Keywords

                    CV:
                    ${cvText}

                    JOB DESCRIPTION:
                    ${jobDescription}`;

    const response = await generateContent(prompt);

    res.json({
      success: true,
      tailoredCV: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyseCV,
  generateCoverLetter,
  tailorCV,
};