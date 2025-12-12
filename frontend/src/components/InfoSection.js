import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function InfoSection() {
  return (
    <Card
      sx={{
        mb: 4,
        background: "#eef7ff",
        borderRadius: 4,
        p: 2,
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          ℹ️ Why use this portal?
        </Typography>

        <ul style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
          <li>✔ Secure storage of all medical documents</li>
          <li>✔ Easy online access anytime anywhere</li>
          <li>✔ Download & share with doctors instantly</li>
          <li>✔ Maintain your entire medical history in one place</li>
        </ul>
      </CardContent>
    </Card>
  );
}
