import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import UploadSection from "./components/UploadSection";
import InfoSection from "./components/InfoSection";
import DocumentTable from "./components/DocumentTable";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Wrapper component to use useLocation inside Router
function AppContent() {
  const location = useLocation(); // ✅ Needed for key refresh fix

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f7fbff" }}>

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <Box
        sx={{
          flexGrow: 1,
          px: 4,
          py: 3,
          ml: "240px",       // ensure content shifts right of sidebar
          overflowY: "auto",
          maxHeight: "100vh"
        }}
      >
        <Routes>

          {/* DASHBOARD PAGE */}
          <Route
            path="/"
            element={
              <>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                  <Hero />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                  <UploadSection />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                  <InfoSection />
                </motion.div>

                
                
              </>
            }
          />

          {/* UPLOAD PAGE */}
          <Route path="/upload" element={<UploadSection />} />

          {/* DOCUMENT LIST PAGE — with remounting fix */}
          <Route
            path="/documents"
            element={<DocumentTable key={location.pathname} />} // ✅ Forces refresh
          />

          {/* ABOUT PAGE */}
          <Route path="/about" element={<InfoSection />} />

        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />  {/* location-aware content */}
    </Router>
  );
}
