const { generateContent } = require("../services/geminiService");

const analyseCV = async (req, res) => {
  try {
    const { cvText, jobDescription } = req.body;

    const prompt = `You are a professional ATS recruiter.
                    Analyse this CV against the job description.

                    Return:
                    1. Match Score (/100)
                    2. Key Strengths
                    3. Missing Skills
                    4. Recommendations

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

    res.json({
      success: true,
      coverLetter: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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