const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
  analyseCVController,
  tailoredCVController,
  coverLetterController,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/analyse",
  upload.single("cv"),
  analyseCVController
);

router.post(
  "/tailored-cv",
  upload.single("cv"),
  tailoredCVController
);

router.post(
  "/cover-letter",
  upload.single("cv"),
  coverLetterController
);

module.exports = router;