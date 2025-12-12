import React from "react";
import { 
  Box, 
  Typography, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadIcon from "@mui/icons-material/Upload";
import FolderIcon from "@mui/icons-material/Folder";
import InfoIcon from "@mui/icons-material/Info";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 240,
        background: "#003b5c",
        color: "white",
        minHeight: "100vh",
        p: 2,
        boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Sidebar Title */}
      <Typography 
        variant="h5" 
        fontWeight="bold" 
        sx={{ mb: 4, ml: 1 }}
      >
        🏥 HealthVault
      </Typography>

      {/* Navigation Menu */}
      <List>

        {/* Dashboard */}
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Upload Page */}
        <ListItemButton onClick={() => navigate("/upload")}>
          <ListItemIcon>
            <UploadIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Upload Reports" />
        </ListItemButton>

        {/* Documents Page */}
        <ListItemButton onClick={() => navigate("/documents")}>
          <ListItemIcon>
            <FolderIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="My Documents" />
        </ListItemButton>

        {/* About Page */}
        <ListItemButton onClick={() => navigate("/about")}>
          <ListItemIcon>
            <InfoIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>

      </List>
    </Box>
  );
}
