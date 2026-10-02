const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});