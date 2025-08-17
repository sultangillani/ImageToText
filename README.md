# 📂 Realtime File Upload & Preview App  

A simple **Node.js + Express + EJS + Bootstrap** application that allows users to upload images, preview them in realtime, extract associated text, and manage uploaded images.  

---

## 🚀 Features  
- 📤 Upload image files with realtime preview before submitting  
- 🖼️ Store image details (name, URL, extracted text)  
- 📑 Display all uploaded images in a table with actions  
- 🗑️ Delete uploaded images by name or via direct action link  
- 🎨 Styled with **Bootstrap 5** and custom CSS  

---

## 🛠️ Tech Stack  
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS templates, HTML5, CSS3, Bootstrap 5  
- **File Handling:** Multer (for file uploads)  

---

## 📂 Project Structure  

/uploads # Uploaded image files
├── /views # EJS templates
│ ├── home.ejs
├── index.js # Main server file
├── package.json # Dependencies & scripts
└── README.md # Documentation

📌 Usage

  Navigate to the upload form.
  Select an image → preview shows instantly before upload.
  Submit the form to save the file.
  Uploaded images appear in the table with:
    Serial Number
    File Name
    File Preview (clickable)
    Extracted Text
    Delete Action

🗑️ Deleting Images
    Use the Delete button/link in the table.
    Or submit the Delete Form with the image name.

🤝 Contributing
    Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

Thanks!
