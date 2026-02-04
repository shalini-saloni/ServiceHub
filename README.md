# HandyHub 

**Your One-Stop Solution for Everyday Services**

HandyHub is a full-stack **MERN** (MongoDB, Express, React, Node.js) platform designed to bridge the gap between homeowners and professional service providers. Whether it's a quick fix or a major renovation, HandyHub makes hiring local experts seamless and secure.

---

## Key Features

* **Intelligent Auto-Location:** Automatically detects your location (e.g., *Pune, Maharashtra*) using Geolocation APIs and Reverse Geocoding.
* **Persistent Cart System:** Shopping cart items are synced to MongoDB, ensuring your selections are saved across different devices and sessions.
* **Secure Authentication:** Full user lifecycle management (Signup/Login) using **JWT** (JSON Web Tokens) and **bcrypt** password encryption.
* **Smart Search:** Filter services by category or name with a dynamic, auto-suggesting search interface.

---

## Tech Stack

### Frontend
* **React.js** (Functional Components & Hooks)
* **React Router DOM** (Client-side Routing)
* **Lucide React** (Modern Iconography)
* **CSS3** (Custom Flexbox/Grid Layouts & Animations)

### Backend
* **Node.js & Express.js** (Server Logic & RESTful APIs)
* **MongoDB & Mongoose** (NoSQL Database & Object Modeling)
* **JWT & Bcrypt** (Security & Authentication)
* **Cors & Dotenv** (Middleware & Environment Security)

---
## Installation & Setup
1. **Clone the Project**

    ```Bash
    git clone [https://github.com/your-username/handyhub.git](https://github.com/your-username/handyhub.git)
    cd handyhub
    ```
2. **Backend Configuration**

    * *Navigate to the server folder: cd server*
    * *Install dependencies: npm install*
    * *Create a .env file and add:*
    ```bash
    Code snippet
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=5000
    ```
    * *Start server: npm start*

3. **Frontend Configuration**

    * *Navigate to the client folder: cd ../client*

    * *Install dependencies: npm install*

    * *Start application: npm run dev*

## API Endpoints
### Auth
    POST /api/auth/signup - Register a new user
    POST /api/auth/login - User login & token generation
    PUT /api/auth/update - Update user profile details

### Cart
    GET /api/cart/:userId - Retrieve saved cart items
    POST /api/cart/sync - Sync local cart state with the database


