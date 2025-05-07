const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const upload = require("./config/multer");
const {
  validateFiles,
  verifyProcedureFlag,
  validateAddUser,
} = require("./middlewares/validate");
const {
  createAddUserProcedure,
  addUserViaProcedure,
} = require("./utils/procedures/user");
const db = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uploadDir = path.join(__dirname, "../upload_images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.static("public"));
app.use("/upload_images", express.static(uploadDir));

// api routes
app.use("/health", (req, res) => res.send("Server is healthy!!"));

app.post("/upload", upload.array("images"), validateFiles, (req, res) => {
  const fileUrls = req.files.map((file) => ({
    originalName: file.originalname,
    fileName: file.filename,
    path: `/upload_images/${file.filename}`,
  }));

  res.status(201).json({
    message: "Files uploaded successfully",
    files: fileUrls,
  });
});

app.post(
  "/create-user-procedure",
  verifyProcedureFlag,
  validateAddUser,
  async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "Body is empty" });

    const { email, password, type, active = 1 } = req.body;
    await createAddUserProcedure(db);
    await addUserViaProcedure(db, email, password, type, active);
    res.status(201).json({
      message: "Created stored procedure and added user",
    });
  }
);

module.exports = app;
