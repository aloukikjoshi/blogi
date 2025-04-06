# Blogi

Blogi is a modern blogging platform built to help writers share their stories with the world. This documentation provides a step-by-step guide on how to install, configure, and run the project locally, along with details about the tech stack and functionalities.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features and Functionalities](#features-and-functionalities)
- [Installation](#installation)
- [Directory Structure](#directory-structure)
- [Running the Project](#running-the-project)
- [Configuration](#configuration)
- [Running the Project Locally](#running-the-project-locally)
- [Additional Information](#additional-information)
- [Support](#support)


---

## Overview

Blogi is designed as a full-stack web application which provides the following:
- User registration and authentication
- Create, edit, and delete blog posts
- Explore posts and pagination
- Responsive design for both desktop and mobile views
- Modern UI components and interactive elements using React and Tailwind CSS

---

## Tech Stack

- **Frontend:**
  - React (with TypeScript)
  - Vite for bundling
  - React Router for navigation
  - Tailwind CSS for styling
  - Radix UI components for building accessible UI elements
  - Additional libraries: `react-query`, `lucide-react`, etc.

- **Backend:**
  - FastAPI for the REST API
  - SQLAlchemy for ORM and database interactions
  - PostgreSQL as the primary database
  - Pydantic for data validation and settings management

- **Other Tools:**
  - Native Fetch API for making HTTP requests
  - Git for version control

---

## Features and Functionalities

- **User Management:**  
  Users can register, log in and view profiles.
  
- **Post Management:**  
  Authenticated users can create, edit, and delete posts, and posts support tag management.
  
- **Responsive Design:**  
  The application has separate navigation menus for desktop and mobile views, ensuring consistency in user experience.
  
- **Explore Posts:**  
  Users can explore posts by category or view the latest additions.
  
- **Rich UI Elements:**  
  Utilizes accessible components like modals, tooltips, toast notifications, and more.

---

## Installation

### Prerequisites

- **Node.js (v16 or later):** Download and install from [nodejs.org](https://nodejs.org/)
- **Python 3.9+ (with pip):** Download and install from [python.org](https://www.python.org/)
- **PostgreSQL Server:** Download and install from [postgresql.org](https://www.postgresql.org/)
- **Git:** Download and install from [git-scm.com](https://git-scm.com/)

### 1. Clone the Repository

Open your terminal and navigate to your desired directory, then run:

```bash
cd ~/workspace/my-blog
git clone https://github.com/aloukikjoshi/blogi.git
cd blogi
```

### 2. Setup Backend

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Create and activate a virtual environment:**

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

3. **Install Python dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure environment variables:**

    Create a `.env` file in the backend folder with the following (adjust values as necessary):

    ```env
    DATABASE_URL=postgresql://username:password@localhost:5432/blogidb
    SECERET_KEY=your_secret_key
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    CORS_ORIGINS=http://localhost:8080,http://localhost:3000
    ```
    To generate a secret key, you can use the following command:
    ```bash
    openssl rand -hex 32
    ```

5. **Set Up the Database:**

    Ensure PostgreSQL is running, then create the database:
    ```bash
    createdb blogidb
    ```

6. **Run Database Migrations (if applicable):**
    ```bash
    alembic upgrade head
    ```

7. **Start the Backend Server:**
    ```bash
    uvicorn app.main:app --reload
    ```
    Your backend API should now be running at [http://localhost:8000](http://localhost:8000).

### 3. Setup Frontend

1. Open a new terminal window.
2. Navigate to the frontend directory by running:
   
  ```bash
  cd frontend
  ```

2. **Install Node.js dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the frontend folder with at least the following variable:

    ```env
    VITE_API_URL=http://localhost:8000/api/v1
    ```

4. **Start the Frontend Development Server:**

    ```bash
    npm run dev
    ```
    Your frontend application should now be running (usually at [http://localhost:3000](http://localhost:3000) or [http://localhost:8080](http://localhost:8080)).

---

## Directory Structure

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

## Running the Project

- **Ensure Both Servers Are Running:**  
  Start the backend (FastAPI) and the frontend (React) as described above.

- **Access the Application:**  
  Open your browser and navigate to the URL provided by the frontend development server (typically [http://localhost:3000](http://localhost:3000)).

You now have a fully functional local setup to develop and test Blogi.

---

## Configuration

Configure the project settings:

1. Update environment variables:
    - Edit the `.env` file in the backend directory with your PostgreSQL credentials and other settings.
2. Adjust frontend settings:
    - Verify that API endpoints and environment configurations match your setup essentials.
3. Confirm that dependency versions meet the requirements detailed in the documentation.

---

## Running the Project Locally

Start the application for local development:

1. **Run the Backend:**  
   In the backend directory, start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
2. **Run the Frontend:**  
   In the frontend directory, start the development server:
   ```bash
   npm run dev
   ```
3. **Open your Browser:**  
   Navigate to the provided URL (typically [http://localhost:3000](http://localhost:3000)) to view the live project.

---

## Additional Information

For further details and troubleshooting:

1. Review logs and terminal output to identify any issues during startup.
2. Confirm that all environment variables are correctly set.
3. Consult the documentation for FastAPI, React, and other tools for advanced configuration and debugging.
4. Report issues or contribute improvements by opening an issue or pull request on the GitHub repository.

---

## Support

If you encounter any issues or have questions during setup or while running Blogi, please contact me at:

**Email:** aloukikjoshi@gmail.com