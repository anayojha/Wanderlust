# 🌍 Wanderlust

Wanderlust is a full-stack accommodation booking platform inspired by Airbnb. Users can explore, list, and review travel stays — from cozy pool-side retreats to mountain-facing cottages — with real-time search, category filtering, price sorting, and interactive location maps. Built with Node.js, Express, and MongoDB following the MVC pattern.

[![Node.js](https://img.shields.io/badge/Node.js-26.5.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-lightgrey)]()
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()

**🔗 Live Demo:** [wanderlust-1gbz.onrender.com](https://wanderlust-1gbz.onrender.com)

---

## 📑 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Folder Structure](#-folder-structure)
- [Security](#-security)
- [Learning Outcomes](#-learning-outcomes)
- [Future Scope](#-future-scope)
- [Deployment](#-deployment)
- [API Integration](#-api-integration)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

**Discovery & Browsing**
- 🔎 Search listings by destination
- 🗂️ Filter by category (Trending, Rooms, Iconic Cities, Mountains, Castles, Pools, Farms, Camping, Arctic, All)
- 🔃 Sort listings by price (low to high / high to low)
- 💰 Toggle to display total price after tax

**Listings**
- 🏠 Create, view, edit, and delete property listings
- 📸 Image uploads via Multer and Cloudinary
- 🗺️ Interactive maps with geocoding (OpenRouteService)

**Reviews**
- ⭐ Add, view, and delete reviews and ratings on listings

**Authentication & Sessions**
- 🔐 Sign up, log in, and log out with Passport.js
- 🔒 Persistent sessions with `express-session` and `connect-mongo`
- 💬 Flash messages for success/error feedback

---

## 📸 Screenshots

![Home Page](screenshots/home-page.jpeg)
![Listing Details](screenshots/listing-details.jpeg)
![Map View](screenshots/map-view.jpeg)
![Login](screenshots/login-page.jpeg)
![Signup](screenshots/signup-page.jpeg)
![Create Listing](screenshots/create-listing-page.jpeg)

---

## 🏗️ Architecture

**High-Level Architecture**

```mermaid
flowchart LR
    A[Client Browser] -->|HTTP Requests| B[Express Server]
    B --> C[Routes]
    C --> D[Controllers]
    D --> E[Models / Mongoose]
    E --> F[(MongoDB Atlas)]
    D --> G[Cloudinary API]
    D --> H[OpenRouteService API]
    B --> I[EJS Views]
    I --> A
```

**MVC Architecture**

```mermaid
flowchart TB
    subgraph Model
        M1[Mongoose Schemas: Listing, Review, User]
    end
    subgraph View
        V1[EJS Templates]
    end
    subgraph Controller
        C1[Route Handlers]
    end
    Client -->|Request| C1
    C1 -->|Query/Update| M1
    M1 -->|Data| C1
    C1 -->|Render| V1
    V1 -->|Response| Client
```

**Authentication Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant P as Passport.js
    participant DB as MongoDB

    U->>S: Submit login form
    S->>P: Authenticate credentials
    P->>DB: Verify user (passport-local-mongoose)
    DB-->>P: User found / hashed password match
    P-->>S: Authentication result
    S->>S: Create session (connect-mongo)
    S-->>U: Redirect + flash message
```

**Create Listing Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant J as Joi Validation
    participant M as Multer + Cloudinary
    participant O as OpenRouteService
    participant DB as MongoDB

    U->>S: Submit new listing form (with image)
    S->>J: Validate input
    J-->>S: Valid / invalid
    S->>M: Upload image to Cloudinary
    M-->>S: Image URL
    S->>O: Geocode listing location
    O-->>S: Coordinates
    S->>DB: Save listing with image URL + geometry
    DB-->>S: Confirmation
    S-->>U: Redirect to new listing page
```

---

## 🛠️ Tech Stack

**Frontend**
- EJS, EJS-Mate (templating)
- HTML5, CSS3, Bootstrap
- Font Awesome (icons)

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose (ODM)

**Authentication**
- Passport.js
- Passport-Local-Mongoose
- express-session, connect-mongo

**Cloud Services**
- Cloudinary (image storage & delivery)
- Multer + multer-storage-cloudinary (file uploads)

**APIs**
- OpenRouteService (geocoding & maps)

**Deployment**
- Render (hosting)
- MongoDB Atlas (database)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v26.5.0 or compatible)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account
- An [OpenRouteService](https://openrouteservice.org/) API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anayojha/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) below).

4. **Run the application**
   ```bash
   node app.js
   ```

5. **Open in your browser**
   ```
   http://localhost:8080
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ORS_API_KEY=your_openrouteservice_api_key
```

| Variable | Purpose |
|---|---|
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `SECRET` | Session/cookie signing secret |
| `CLOUD_NAME` | Cloudinary account cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `ORS_API_KEY` | OpenRouteService API key for geocoding/maps |

---

## 📁 Folder Structure

```
Wanderlust/
├── controllers/       # Route handler logic
├── init/              # Database seeding/initialization scripts
├── models/            # Mongoose schemas (Listing, Review, User, etc.)
├── public/            # Static assets (CSS, JS, images)
├── routes/            # Express route definitions
├── utils/             # Helper functions and utilities
├── views/             # EJS templates
├── app.js             # Application entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js       # Custom middleware (auth checks, validation, etc.)
├── schema.js            # Joi validation schemas
├── updateGeometry.js     # Script to update listing geolocation data
├── package.json
└── .gitignore
```

---

## 🛡️ Security

- **Passport-Local-Mongoose** for secure credential storage and authentication
- **Password hashing** handled automatically via Passport-Local-Mongoose (no plaintext passwords stored)
- **Authentication & Authorization** checks via custom middleware to protect routes and restrict edit/delete actions to listing owners
- **Joi validation** on all incoming listing and review data to prevent malformed input
- **MongoDB injection prevention** through Mongoose schema typing and validation
- **Session-based login** with secure, server-side session storage via `connect-mongo`

---

## 📚 Learning Outcomes

Building Wanderlust helped strengthen hands-on experience with:

- Structuring a full application using the **MVC pattern**
- Designing and consuming **RESTful routes**
- Implementing **authentication and authorization** from scratch with Passport.js
- Handling **file uploads** and integrating third-party storage (Cloudinary)
- Working with **geocoding APIs** to convert addresses into map coordinates
- **Deploying** a Node.js/Express app with a live database to production

---

## 🔮 Future Scope

- 📅 Booking system with availability calendar
- 💳 Payment gateway integration
- ❤️ Wishlist / Favorites for saved listings
- 👤 User profile pages
- 🛠️ Admin dashboard for managing listings and users

---

## ☁️ Deployment

- **Hosting:** Render
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary

---

## 🔌 API Integration

- **[OpenRouteService](https://openrouteservice.org/)** — geocoding listing addresses into coordinates for map display
- **[Cloudinary](https://cloudinary.com/)** — image upload, storage, and delivery

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

All rights reserved. This project is not currently licensed for reuse, modification, or distribution without permission from the author.

---

## 👤 Author

**Anay Ojha**
GitHub: [@anayojha](https://github.com/anayojha)
