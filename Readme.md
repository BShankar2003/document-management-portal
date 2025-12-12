📄 Document Management Portal – README

This project is a full-stack document management portal that allows users to upload, view, download, and delete PDF files. It is built using React (frontend), Node.js + Express (backend), SQLite (database), and Multer (file handling).

🚀 Project Overview

The system enables a user to:

✔ Upload PDF documents
✔ Store document metadata in SQLite
✔ View a list of uploaded files
✔ See file size (in KB) and upload timestamp
✔ Download documents
✔ Delete documents safely

The backend exposes REST APIs to handle uploads, retrieval, and deletion.
The frontend uses Material UI for clean and responsive UI rendering.

🏗 Tech Stack
Frontend

React.js

Material UI

Framer Motion (animations)

Fetch API for backend communication

Backend

Node.js

Express.js

Multer (file uploads)

SQLite3 (embedded local database)

Better-SQLite3 (fast database driver)

📁 Project Folder Structure
Healthcare Platform/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── uploads/        # Stores uploaded PDFs
│   │   ├── db.js
│   │   ├── server.js
│   ├── package.json
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── App.js
│   ├── package.json
│
│── documents.db           # SQLite Database
│── design.md              # System design document
│── README.md              # This file

⚙ How to Run the Project (Local Instructions)
1️⃣ Install Backend Dependencies

Open terminal:

cd backend
npm install

2️⃣ Start Backend Server
npm start


Backend runs on:

👉 http://localhost:4000

3️⃣ Install Frontend Dependencies

Open a new terminal:

cd frontend
npm install

4️⃣ Start Frontend
npm start


Frontend runs on:

👉 http://localhost:3000

📝 API Documentation
POST /documents/upload

Uploads a PDF file.

Request
multipart/form-data
file: <PDF file>

Response
{
  "id": 10,
  "original_name": "Example.pdf",
  "stored_name": "uuid.pdf",
  "filepath": "uploads/uuid.pdf",
  "filesize": 73214,
  "created_at": "2025-12-12T12:47:34.000Z"
}

GET /documents

Returns all uploaded document metadata.

Response
[
  {
    "id": 12,
    "original_name": "Report.pdf",
    "filesize": 45233,
    "created_at": "2025-12-12T10:20:00.000Z"
  }
]

GET /documents/:id

Downloads a PDF document.

DELETE /documents/:id

Deletes:

The file from the system

The metadata row from SQLite

Response
{
  "success": true,
  "message": "Document deleted successfully"
}

🧠 Key Features
✔ Real File Size Detection

Uses fs.statSync() to fetch accurate size.

✔ UUID-based File Storage

Prevents filename conflicts by renaming files internally.

✔ Material UI Table

Shows:

File name

File size

Upload timestamp

Download button

Delete button

✔ Error Handling

Invalid file type

Missing file on disk

DB entry not found

🔒 Assumptions

Only PDFs are allowed (per assignment rules).

System is single-user (authentication not required).

Maximum file size: 10 MB.

Runs locally with no cloud dependencies.

📈 Scalability Thoughts

If the system were to handle 1,000+ users, improvements would include:

Migrating storage to AWS S3

Using PostgreSQL instead of SQLite

Deploying backend on Docker + Kubernetes

Adding user authentication (JWT)

Using Redis for caching

More detail is available in design.md.

🧪 Testing Steps

Start backend → confirm Server running on port 4000.

Start frontend → open http://localhost:3000.

Upload multiple PDFs.

Refresh → ensure list persists.

Test download.

Delete a file → confirm it:

disappears from UI

is removed from SQLite

is removed from /uploads

🤝 Author

Shankar Subhan Singh
Full-Stack Developer (Assessment Project)