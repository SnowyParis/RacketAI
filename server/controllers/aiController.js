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
  let cvText = "";

  try {
    const {
      jobTitle,
      company,
      hiringManager,
      tone,
      additionalInfo,
      useCVAnalysis,
      cvAnalysis: rawCVAnalysis,
    } = req.body;

    if (!jobTitle?.trim() || !company?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job title and company are required.",
      });
    }

    let cvAnalysis = null;

    if (useCVAnalysis === "true") {
      if (!rawCVAnalysis) {
        return res.status(400).json({
          success: false,
          message: "No saved CV analysis was provided.",
        });
      }

      try {
        cvAnalysis = JSON.parse(rawCVAnalysis);
      } catch {
        return res.status(400).json({
          success: false,
          message: "The saved CV analysis is invalid.",
        });
      }
    }

    // A separate CV upload is optional.
    if (req.file) {
      cvText = await parseFile(req.file);
    }

    if (!cvText && !cvAnalysis) {
      return res.status(400).json({
        success: false,
        message:
          "Upload a CV or select a saved CV analysis to personalise your letter.",
      });
    }

    const result = await generateCoverLetter({
      cvText,
      cvAnalysis,
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      hiringManager: hiringManager?.trim() || "",
      tone: tone || "Professional",
      additionalInfo: additionalInfo?.trim() || "",
    });

    if (!result.coverLetter) {
      return res.status(502).json({
        success: false,
        message: "The AI did not return a cover letter.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "Cover letter generation error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        "Unable to generate the cover letter. Please try again.",
    });
  }
}

module.exports = {
  analyseCVController,
  tailoredCVController,
  coverLetterController,
};