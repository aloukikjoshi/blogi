# 🌟 commonminds

commonminds is a modern blogging platform built to help writers share their stories with the world. ✍️  
[Live Demo 🌐](https://www.commonminds.vercel.app)

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Features and Functionalities](#-features-and-functionalities)
- [⚙️ Installation](#-installation)
- [📂 Directory Structure](#-directory-structure)
- [🏃 Running the Project](#-running-the-project)
- [🔧 Configuration](#-configuration)
- [🖥️ Running the Project Locally](#-running-the-project-locally)
- [🌐 Deployment](#-deployment)
- [⚡ Challenges and Solutions](#-challenges-and-solutions)
- [📚 Additional Information](#-additional-information)
- [💌 Support](#-support)

---

## ✨ Overview

commonminds is a full-stack web application designed to provide a seamless blogging experience. It offers:  
- 🔐 **User registration and authentication**  
- 📝 **Create, edit, and delete blog posts**  
- 🔍 **Explore posts with pagination**  
- 📱 **Responsive design for all devices**  
- 🎨 **Modern UI with React and Tailwind CSS**

---

## 🛠️ Tech Stack

### **Frontend**  
- ⚛️ React (with TypeScript)  
- ⚡ Vite for bundling  
- 🧭 React Router for navigation  
- 🎨 Tailwind CSS for styling  
- 🧩 Radix UI for accessible components  
- 📦 Additional libraries: `react-query`, `lucide-react`, etc.

### **Backend**  
- 🚀 FastAPI for the REST API  
- 🗄️ SQLAlchemy for ORM  
- 🐘 PostgreSQL as the database  
- ✅ Pydantic for data validation  

### **Other Tools**  
- 🌐 Native Fetch API for HTTP requests  
- 🛠️ Git for version control  

---

## 🚀 Features and Functionalities

- **User Management:**  
  🔑 Register, log in, and manage profiles.  

- **Post Management:**  
  📝 Create, edit, delete posts, and manage tags.  

- **Responsive Design:**  
  📱 Optimized for both desktop and mobile.   

- **Rich UI Elements:**  
  🎛️ Accessible components like modals, tooltips, and toast notifications.

---

## 🌐 Deployment

commonminds is fully deployed online for a seamless experience:  
- **Frontend & Backend:** Deployed on [Vercel](https://vercel.com/).  
- **Database:** Hosted on **Neon DB** for reliable and scalable data storage. 

---

## ⚡ Challenges and Solutions

### **Handling CORS Origins Errors**

**Challenge:**  
During development, the application encountered Cross-Origin Resource Sharing (CORS) errors when the frontend tried to communicate with the backend API. This prevented the client-side application from making successful API requests, resulting in blocked network calls and failed data fetching.

**Why It Occurred:**  
CORS errors occur when a web application running on one domain (origin) attempts to make requests to a server on a different domain. In this project:
- The **frontend** was running on `http://localhost:5173` during local development and `https://commonminds.vercel.app` in production
- The **backend API** was running on a separate domain/port (`http://localhost:8000` locally and Vercel deployment URL in production)
- By default, browsers block cross-origin requests for security reasons unless the server explicitly allows them

**Solution Implemented:**  
The issue was resolved by configuring FastAPI's CORS middleware to explicitly allow requests from trusted origins. In the backend's `main.py` file, the following configuration was added:

```python
from fastapi.middleware.cors import CORSMiddleware

# CORS configuration
origins = [
    "https://commonminds.vercel.app",
    "http://localhost:5173",
    "http://localhost:8000",
]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Technical Details:**
- `allow_origins`: Specifies the list of allowed origins (domains) that can make requests to the API
- `allow_credentials`: Enables sending cookies and authentication credentials with cross-origin requests
- `allow_methods=["*"]`: Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
- `allow_headers=["*"]`: Allows all HTTP headers in requests

This configuration ensures smooth communication between the frontend and backend in both development and production environments while maintaining security by only allowing requests from specified trusted origins.

---

## 💌 Support

If you encounter any issues or have questions, feel free to reach out:  
📧 **Email:** aloukikjoshi@gmail.com
