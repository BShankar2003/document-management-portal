import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import UploadForm from "./UploadForm";

export default function UploadSection() {
  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 4,
        p: 2,
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📄 Upload Medical Reports (PDF only)
        </Typography>

        <UploadForm onUploadSuccess={() => window.location.reload()} />
      </CardContent>
    </Card>
  );
}
