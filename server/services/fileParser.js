const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractTextFromFile = async (file) => {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    let text = "";

    if (file.mimetype === "application/pdf") {
      const pdfData = await pdf(file.buffer);
      text = pdfData.text;
    }
    else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({
        buffer: file.buffer,
      });

      text = result.value;
    }

    return text;
    
  } catch (error) {
    throw new Error("Failed to parse file");
  }
};

module.exports = {
  extractTextFromFile,
};