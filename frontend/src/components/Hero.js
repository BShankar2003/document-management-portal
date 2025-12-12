import React from "react";
import { Box, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #d0f1ff, #e8ecff)",
        p: 4,
        borderRadius: 4,
        mb: 4,
        boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/2966/2966483.png"
        width="110"
        alt="Hero"
      />

      <Typography variant="h3" fontWeight="bold" mt={2}>
        Healthcare Document Portal
      </Typography>

      <Typography variant="h6" color="text.secondary" mt={1}>
        Upload, store, organize & download your medical files with ease.
      </Typography>
    </Box>
  );
}
