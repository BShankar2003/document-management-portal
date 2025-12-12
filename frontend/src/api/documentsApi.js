const API_URL = "http://localhost:4000/documents";

export const getDocuments = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch documents");

  const data = await res.json();

  // Normalize for DataGrid
  return data.map(doc => ({
    id: Number(doc.id),
    original_name: doc.original_name || "",
    filesize: Number(doc.filesize) || 0,
    created_at: doc.created_at || null
  }));
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

export const downloadDocument = (id) => {
  window.open(`${API_URL}/${id}`, "_blank");
};

export const deleteDocument = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};
