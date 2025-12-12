import React, { useState } from "react";
import { Button, Stack, Alert } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadDocument } from "../api/documentsApi";

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return setError("Please select a PDF file.");
    if (file.type !== "application/pdf") return setError("Only PDFs allowed.");

    try {
      await uploadDocument(file);
      setFile(null);
      setError("");
      onUploadSuccess();
    } catch {
      setError("Upload failed. Try again.");
    }
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button
        variant="contained"
        startIcon={<UploadFileIcon />}
        onClick={handleUpload}
      >
        Upload
      </Button>
    </Stack>
  );
};

export default UploadForm;
