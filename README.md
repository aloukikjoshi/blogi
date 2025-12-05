# 🌟 commonminds

commonminds is a modern blogging platform built to help writers share their stories with the world. ✍️  
[Live Demo 🌐](https://blogi-aloukikjoshis-projects.vercel.app/)

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

- **Explore Posts:**  
  🔍 Browse posts by category or view the latest.  

- **Rich UI Elements:**  
  🎛️ Accessible components like modals, tooltips, and toast notifications.

---

## ⚙️ Installation

### Prerequisites  
Ensure you have the following installed:  
- **Node.js (v16 or later):** [Download here](https://nodejs.org/)  
- **Python 3.9+ (with pip):** [Download here](https://www.python.org/)  
- **PostgreSQL Server:** [Download here](https://www.postgresql.org/)  
- **Git:** [Download here](https://git-scm.com/)  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/aloukikjoshi/blogi.git
cd blogi
```

### 2️⃣ Setup Backend  
1. Navigate to the backend directory:  
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:  
   - On Mac/Linux:  
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - On Windows:  
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:  
   Create a `.env` file with:  
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/blogidb
   SECRET_KEY=your_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   CORS_ORIGINS=http://localhost:8080,http://localhost:3000
   ```
5. Set up the database:  
   ```bash
   createdb blogidb
   ```
6. Run migrations:  
   ```bash
   alembic upgrade head
   ```
7. Start the backend server:  
   ```bash
   uvicorn app.main:app --reload
   ```

### 3️⃣ Setup Frontend  
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Configure environment variables:  
   Create a `.env` file with:  
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```
4. Start the frontend server:  
   ```bash
   npm run dev
   ```

---

## 📂 Directory Structure

After installation, your project directory should be organized as follows:

```
blogi/
├── backend/
│   ├── .venv/                                  # Virtual environment 
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                             # Entry point for FastAPI
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── dependencies.py                 # Dependency injection for FastAPI
│   │   │   └── endpoints/                      # API endpoint definitions
│   │   │        ├── __init__.py
│   │   │        ├── auth.py
│   │   │        ├── posts.py
│   │   │        └── users.py
│   │   ├── models/                             # Database models
│   │   │   ├── __init__.py
│   │   │   ├── post.py
│   │   │   └── user.py                          # User model definition
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── post.py                         # Pydantic schemas for posts
│   │   │   └── user.py                         # Pydantic schemas for users
│   │   ├── crud/                               # CRUD operations for database interactions
│   │   │   ├── __init__.py
│   │   │   ├── post_crud.py                    # CRUD operations for posts
│   │   │   └── user_crud.py                    # CRUD operations for users
│   │   └── core/                               # Core functionalities
│   │       ├── database.py                     # Database connection and session management
│   │       ├── security.py                     # Security utilities (e.g., password hashing)
│   │       └── config.py                       # Configuration settings
│   ├── migrations/                             # Database migrations (if using Alembic)
│   │     ├── versions/                         # Migration version files
│   │     ├── env.py                            # Alembic environment configuration
│   │     ├── script.py.mako                    # Alembic script template
│   │     └── README.md                         # Migration documentation
│   ├── static/ uploads/                        # Static files (e.g., images, CSS)
│   ├── requirements.txt                        # Python dependencies
│   ├── alembic.ini                             # Alembic configuration (if using migrations)
│   ├── .gitignore                              # Git ignore file
│   └── .env                                    # Environment variables for backend
├── frontend/
│   ├── node_modules/                           # Node.js modules (auto-generated)
│   ├── public/                                 # Public assets
│   │   ├── assets/                             # Static assets (e.g., images, icons)
│   │   │   └── onegraph-image.png              # OneGraph image
│   │   ├── favicon.svg                         # Favicon for the application
│   │   ├── placeholder.svg                     # Placeholder image for posts
│   │   └── robots.txt                          # Robots.txt for SEO
│   ├── src/
│   │   ├── components/                         # Reusable React components
│   │   │     ├── auth/               
│   │   │     │    └── RequireAuth.tsx          # Auth wrapper component
│   │   │     ├── layout/                       # Layout components (e.g., Header, Footer)
│   │   │     │     ├── Header.tsx
│   │   │     │     ├── Layout.tsx
│   │   │     │     └── Footer.tsx
│   │   │     ├── posts/                        # Components related to posts
│   │   │     │     ├── PostGrid.tsx
│   │   │     │     ├── FeaturedPost.tsx
│   │   │     │     ├── PostActions.tsx
│   │   │     │     └── DeletePostButton.tsx 
│   │   │     └── ui/                           # UI components (e.g., buttons, modals)  
│   │   ├── context/                            
│   │   │     └── AuthContext.tsx               # Context for authentication state
│   │   ├── hooks/                              # Custom hooks
│   │   │     ├── use-mobile.tsx          
│   │   │     ├── use-toast.ts          
│   │   │     └── useAuth.ts
│   │   ├── lib/                               
│   │   │     └── utils.ts                             
│   │   ├── pages/                              # Page-level components
│   │   │     ├── Cookies.tsx
│   │   │     ├── Explore.tsx
│   │   │     ├── CreatePost.tsx
│   │   │     ├── EditPost.tsx
│   │   │     ├── Post.tsx
│   │   │     ├── Register.tsx
│   │   │     ├── Privacy.tsx
│   │   │     ├── Terms.tsx
│   │   │     ├── NotFound.tsx
│   │   │     ├── Logout.tsx
│   │   │     ├── Login.tsx
│   │   │     ├── Index.tsx
│   │   │     └── UserProfile.tsx
│   │   ├── services/                           # API services using the native Fetch API
│   │   │     └── api.tsx
│   │   ├── types/                              # Type definitions for the application
│   │   │     └── index.ts                      # Centralized type exports
│   │   ├── utlis/
│   │   │     └── date.ts 
│   │   ├── App.css                             
│   │   ├── index.css
│   │   ├── main.tsx                            # Main entry point for React
│   │   ├── vite-env.d.ts                       # Type definitions for Vite
│   │   └── App.tsx                             # Application entry point for React
│   ├── package.json                            # Node dependencies and scripts
│   ├── package-lock.json                       # Lock file for Node dependencies
│   ├── tailwind.config.js                      # Tailwind CSS configuration
│   ├── postcss.config.js                       # PostCSS configuration
│   ├── tsconfig.json                           # TypeScript configuration
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json                     
│   ├── index.html                              
│   ├── components.json                         # Component library configuration
│   ├── vite.config.ts                          # Vite configuration
│   ├── .gitignore                              # Git ignore file for frontend
│   ├── bun.lockb                               
│   ├── eslint.config.js                        # ESLint configuration
│   └── .env                                    # Environment variables for frontend
├── .gitignore                                  # Git ignore file for the project
├── LICENSE                                     # Project license
├── .env
├── requirements.txt                            
└── README.md                                   # Project documentation
```

Make sure that all these files and directories are in place before proceeding.

---

## 🏃 Running the Project

1. **Start the Backend:**  
   ```bash
   uvicorn app.main:app --reload
   ```
2. **Start the Frontend:**  
   ```bash
   npm run dev
   ```
3. **Access the Application:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

commonminds is fully deployed online for a seamless experience:  
- **Frontend & Backend:** Deployed on [Vercel](https://vercel.com/).  
- **Database:** Hosted on **Azure PostgreSQL** for reliable and scalable data storage. 

---

## ⚡ Challenges and Solutions

### 1️⃣ **Database Connection Issues**  
- **Problem:** Initial connection to Azure PostgreSQL failed due to incorrect SSL configurations.  
- **Solution:** Updated the connection string to include `sslmode=require` and verified credentials.  

### 2️⃣ **CORS Errors**  
- **Problem:** Encountered CORS issues during API calls from the frontend.  
- **Solution:** Configured `CORS_ORIGINS` in the FastAPI backend to allow requests from the frontend's domain.  

### 3️⃣ **Frontend Deployment Issues**  
- **Problem:** Vite's build process caused issues with environment variables during deployment.  
- **Solution:** Ensured `.env` variables were correctly set and used `VITE_` prefix for compatibility with Vite.  

### 4️⃣ **Pagination Performance**  
- **Problem:** Pagination queries were slow for large datasets.  
- **Solution:** Optimized SQL queries using indexed columns and limited the number of records fetched per page.  

### 5️⃣ **Responsive Design Challenges**  
- **Problem:** UI components were not rendering correctly on smaller screens.  
- **Solution:** Used Tailwind CSS's responsive utilities and tested extensively on different devices.  

---

## 📚 Additional Information

- For troubleshooting, check logs and ensure all dependencies are installed.  
- Refer to the official documentation for [FastAPI](https://fastapi.tiangolo.com/), [React](https://reactjs.org/), and [Tailwind CSS](https://tailwindcss.com/).  

---

## 💌 Support

If you encounter any issues or have questions, feel free to reach out:  
📧 **Email:** aloukikjoshi@gmail.com