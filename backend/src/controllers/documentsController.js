const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const db = require("../db");

// Ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, `${uuidv4()}${ext}`);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
}).single("file");

// Upload
exports.upload = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) return next({ status: 400, message: err.message });

    if (!req.file) {
      return next({ status: 400, message: "No file uploaded" });
    }

    const { originalname, filename } = req.file;
    const fullPath = path.join(UPLOAD_DIR, filename);
    const filepath = path.join("uploads", filename);
    const filesize = fs.statSync(fullPath).size;
    const created_at = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO documents (original_name, stored_name, filepath, filesize, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    const info = stmt.run(originalname, filename, filepath, filesize, created_at);

    res.status(201).json({
      id: info.lastInsertRowid,
      original_name: originalname,
      stored_name: filename,
      filepath,
      filesize,
      created_at,
    });
  });
};

// List
exports.list = (req, res) => {
  const rows = db.prepare("SELECT * FROM documents ORDER BY created_at DESC").all();
  res.json(rows);
};

// Download
exports.download = (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return next({ status: 400, message: "Invalid ID" });

  const doc = db.prepare("SELECT * FROM documents WHERE id = ?").get(id);
  if (!doc) return next({ status: 404, message: "Document not found" });

  const fullPath = path.join(__dirname, "..", doc.filepath);

  if (!fs.existsSync(fullPath)) {
    return next({ status: 404, message: "File missing on server" });
  }

  res.download(fullPath, doc.original_name);
};

// Delete
exports.remove = (req, res, next) => {
  const id = Number(req.params.id);
  const doc = db.prepare("SELECT * FROM documents WHERE id = ?").get(id);

  if (!doc) return next({ status: 404, message: "Document not found" });

  const fullPath = path.join(__dirname, "..", doc.filepath);

  try {
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

    db.prepare("DELETE FROM documents WHERE id = ?").run(id);

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
