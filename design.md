

Design Document – Document Management Portal

This document explains the design decisions, architecture, API design, and assumptions I made while building the Document Management Portal.

---

1. Technology Choices

1.1 Frontend Framework – React.js

I chose **React.js** for the frontend because:

* It provides a **component-based architecture**, which made it easy to build reusable UI components like the Upload section and Document table.
* React Hooks simplified state and lifecycle handling.
* It integrates very well with REST APIs.
* The ecosystem is strong, and I used **Material UI** (MUI) to create a clean and modern interface quickly.

---

1.2 Backend Framework – Node.js with Express

I used **Node.js + Express.js** for the backend because:

* It is lightweight, fast, and ideal for handling I/O operations like file uploads.
* Express gives a simple way to implement routing and middleware.
* I could easily integrate Multer for handling PDF uploads.
* It communicates smoothly with the frontend through JSON APIs.

---

1.3 Database Choice – SQLite

I selected SQLite because:

* It's a self-contained, serverless database — perfect for local execution.
* It requires zero configuration.
* It is fast and works well for a single-user or small-scale system.
* The assignment required the project to run locally, and SQLite fits that requirement perfectly.

---

1.4 How I Would Scale for 1,000+ Users

If the system needed to support high concurrency and many users:

| Layer          | Upgrade Needed                        | Reason                                                  |
| -------------- | ------------------------------------- | ------------------------------------------------------- |
| Database       | PostgreSQL or MySQL                   | Better indexing, transactions, and concurrency handling |
| File Storage   | AWS S3 or Google Cloud Storage        | Scalable, distributed, durable storage                  |
| Backend        | Horizontal scaling with load balancer | Handle more requests simultaneously                     |
| Deployment     | Docker + Kubernetes                   | Auto-scaling, rolling updates                           |
| Authentication | JWT / OAuth2                          | Multi-user support and secure access                    |
| Monitoring     | CloudWatch / ELK stack                | Track logs and performance                              |

---

2. Architecture Overview

2.1 System Architecture Diagram

```
┌────────────────────┐        ┌────────────────────────┐
│      React UI      │ <────> │     Express Backend     │
│ (Upload, Table)    │  API   │  (Upload/List/Delete)   │
└────────────────────┘        └─────────────┬──────────┘
                                            │
                                            ▼
                                   ┌───────────────┐
                                   │   SQLite DB    │
                                   │ documents table│
                                   └───────────────┘
                                            │
                                            ▼
                                   ┌───────────────┐
                                   │ uploads/ folder│
                                   └───────────────┘
```

---

3. API Endpoints

3.1 POST /documents/upload

Uploads a PDF file to the server and stores metadata in SQLite.

Request:

```
multipart/form-data
file: <PDF file>
```

Response:

```json
{
  "id": 15,
  "original_name": "myfile.pdf",
  "stored_name": "uuid.pdf",
  "filepath": "uploads/uuid.pdf",
  "filesize": 138221,
  "created_at": "2025-12-12T14:00:00.000Z"
}
```

---

3.2 GET /documents

Returns the list of all uploaded documents.

Example response:

```json
[
  {
    "id": 12,
    "original_name": "Example.pdf",
    "filesize": 74222,
    "created_at": "2025-12-12T10:20:00.000Z"
  }
]
```

---

3.3 GET /documents/:id

Downloads a file by its ID.

The backend:

* Looks up the document in the database.
* Streams the PDF using `res.download()`.

---

3.4 DELETE /documents/:id

Deletes:

1. The physical file from `/uploads`
2. The metadata row from SQLite

Response:

```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

---

4. Data Flow Explanation

4.1 Upload Flow

1. The user selects a PDF.
2. The frontend sends it via `FormData` to `/documents/upload`.
3. Multer saves it in the `/uploads` directory.
4. The backend reads the actual file size using `fs.statSync()`.
5. The backend stores document metadata in SQLite.
6. The frontend updates the table.

---

4.2 Listing Flow

1. React calls `GET /documents`.
2. The backend fetches all rows ordered by timestamp.
3. React displays them using **Material UI DataGrid**.

---

4.3 Download Flow

1. User clicks download icon.
2. Browser hits `GET /documents/:id`.
3. Server responds with `res.download()`.
4. PDF is downloaded to the user’s device.

---

4.4 Delete Flow

1. User clicks the delete icon.
2. A DELETE request is sent.
3. Backend removes:

   * The database entry
   * The actual file from disk
4. UI refreshes immediately.

---

5. Assumptions

* Only PDF uploads are allowed (per assignment instructions).
* Max file size is 10MB.
* There is no authentication (single-user environment).
* System runs entirely on localhost.
* Filenames may conflict, so I used UUID filenames to avoid collisions.
* If a file is missing on disk, the backend returns an appropriate error.

---

6. Future Enhancements

If I were extending the project:

* Add user authentication.
* Add preview thumbnails for PDFs.
* Add search and filtering capabilities.
* Support uploading multiple files at once.
* Implement role-based access control.
* Migrate storage to AWS S3 for reliable scaling.



