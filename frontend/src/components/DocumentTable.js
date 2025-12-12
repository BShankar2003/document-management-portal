import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getDocuments,
  deleteDocument,
  downloadDocument,
} from "../api/documentsApi";

export default function DocumentTable() {
  const [rows, setRows] = useState([]);

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments();

      // Normalize incoming data
      const cleaned = docs.map((doc) => ({
        id: Number(doc.id),
        original_name: doc.original_name,
        filesize: Number(doc.filesize),
        created_at: doc.created_at,
      }));

      setRows(cleaned);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // ----------- FIXED COLUMNS -----------
  const columns = [
    {
      field: "original_name",
      headerName: "File Name",
      flex: 1,
    },

    {
      field: "filesize",
      headerName: "Size (KB)",
      width: 130,
      renderCell: (params) => {
        const size = params.row?.filesize;
        return size ? (size / 1024).toFixed(2) : "-";
      },
    },

    {
      field: "created_at",
      headerName: "Uploaded At",
      width: 220,
      renderCell: (params) => {
        const ts = params.row?.created_at;
        return ts ? new Date(ts).toLocaleString() : "-";
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => downloadDocument(params.row.id)}>
            <DownloadIcon />
          </IconButton>

          <IconButton
            onClick={async () => {
              await deleteDocument(params.row.id);
              loadDocuments();
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 420, width: "100%", mt: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 100]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
