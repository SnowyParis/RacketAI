const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  analyseCV,
  tailorCV,
  generateCoverLetter,
} = require("../controllers/aiController");

router.post(
  "/analyse",
  upload.single("cv"),
  analyseCV
);

router.post("/tailor", tailorCV);

router.post("/cover-letter", generateCoverLetter);

module.exports = router;
