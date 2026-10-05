const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

async function parseFile(file) {
  if (!file) {
    throw new Error("No file was uploaded.");
  }

  const fileExtension = file.originalname.split(".")
    .pop()
    .toLowerCase();

  try {
    // PDF
    if (fileExtension === "pdf") {
      const dataBuffer = fs.readFileSync(file.path);

      const data = await pdfParse(dataBuffer);

      return data.text.trim();
    }

    // DOCX
    if (fileExtension === "docx") {
      const result = await mammoth.extractRawText({
        path: file.path,
      });

      return result.value.trim();
    }

    throw new Error(
      "Unsupported file type. Please upload a PDF or DOCX file."
    );
  } finally {
    // Delete uploaded file after parsing
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
}

module.exports = {
  parseFile,
};