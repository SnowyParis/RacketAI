const { extractTextFromFile } = require("../services/fileParser");
const { generateContent } = require("../services/geminiService");

const analyseCV = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const cvText = await extractTextFromFile(req.file);

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

    const cleaned = response.replace(/```json/g, "")
                            .replace(/```/g, "")
                            .trim();

    const analysis = JSON.parse(cleaned);

    res.json({
        success: true,
        cvText,
        analysis,
    });

    } catch (error) {
        console.error(error);
        
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
    } = req.body;

    const cvText = await extractTextFromFile(req.file);

    const prompt = `Create a ${tone} cover letter.

                    Job Title: ${jobTitle}
                    Company: ${company}
                    Hiring Manager: ${hiringManager}

                    Candidate CV:
                    ${cvText}

                    Additional Information:
                    ${additionalInfo}`;

    const response = await generateContent(prompt);

    res.json({
        success: true,
        response,
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
    const { jobDescription } = req.body;
    const cvText = await extractTextFromFile(req.file);

    const prompt = `Rewrite and optimise this CV for the supplied job description for ATS optimisation.

                    Return valid JSON:

                    {
                        "summary":"",
                        "skills":[],
                        "experienceImprovements":[],
                        "keywords":[]
                    }

                    CV:
                    ${cvText}

                    JOB DESCRIPTION:
                    ${jobDescription}`;

    const response = await generateContent(prompt);

    const cleaned = response.replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

    const tailored = JSON.parse(cleaned);

    res.json({
        success: true,
        tailored,
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
