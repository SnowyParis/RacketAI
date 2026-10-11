const { parseFile } = require("../services/fileParser");

const {
  analyseCV,
  generateTailoredCV,
  generateCoverLetter,
} = require("../services/geminiService");

async function analyseCVController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a CV.",
      });
    }

    const { jobDescription } = req.body;

    if (!jobDescription?.trim()) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    // Parse uploaded CV
    const cvText = await parseFile(req.file);

    if (!cvText) {
      return res.status(400).json({
        message:
          "Could not extract text from the uploaded CV.",
      });
    }

    // Send CV + job description to Gemini
    const analysis = await analyseCV(
      cvText,
      jobDescription
    );

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("CV analysis error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        error.message ||
        "Something went wrong.",
    });
  }
}

async function tailoredCVController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a CV.",
      });
    }

    const { jobDescription } = req.body;

    if (!jobDescription?.trim()) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    const cvText = await parseFile(req.file);

    const tailoredCV = await generateTailoredCV(
      cvText,
      jobDescription
    );

    res.json({
      success: true,
      data: tailoredCV,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function coverLetterController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a CV.",
      });
    }

    const { jobDescription } = req.body;

    if (!jobDescription?.trim()) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    const cvText = await parseFile(req.file);

    const coverLetter = await generateCoverLetter(
      cvText,
      jobDescription
    );

    res.json({
      success: true,
      data: coverLetter,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  analyseCVController,
  tailoredCVController,
  coverLetterController,
};