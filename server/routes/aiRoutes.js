const express = require("express");
const router = express.Router();

const {
  analyseCV,
  tailorCV,
  generateCoverLetter,
} = require("../controllers/aiController");

router.post("/analyse", analyseCV);

router.post("/tailor", tailorCV);

router.post("/cover-letter", generateCoverLetter);

module.exports = router;