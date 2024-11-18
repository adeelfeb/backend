# VideoTube Backend

This repository contains the backend implementation for **VideoTube**, a video-sharing platform. The project is built with Node.js and Express, and it leverages MongoDB for database management. It focuses on creating a scalable backend with features like user authentication, file uploads, cloud storage, and efficient error handling.

---

## Features

- **User Registration**: Handles user signup and authentication securely.
- **Asynchronous Error Handling**: Implemented a reusable `asyncHandler` utility for clean error management.
- **File Upload**: Supports file uploads using `multer` and integrates with **Cloudinary** for cloud storage.
- **Environment Configuration**: Utilizes `.env` files for secure environment variable management.
- **API Testing**: Tested and verified endpoints using **Postman**.
- **Best Practices**: Follows modular design for routes, controllers, and utilities.

---

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB
- Cloudinary account (for media storage)

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adeelfeb/backend.git
   cd videotube-backend


2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   DB_URI=<your-mongo-uri>
   CLOUDINARY_NAME=<your-cloudinary-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ACCESS_TOKEN_SECRET=<your-access-token-secret>
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
   REFRESH_TOKEN_EXPIRY=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Run the Application**
   Start the server in development mode:
   ```bash
   npm run dev
   ```

---

## Project Structure

```plaintext
├── src
│   ├── controllers
│   │   └── user.controller.js   # Contains logic for user-related operations
│   ├── router
│   │   └── user.routes.js       # Handles user-related routes
│   ├── utils
│   │   └── asyncHandler.js      # Reusable async error handling utility
│   ├── index.js                 # Entry point for the application
│   └── app.js                   # Express app configuration and middleware
├── public
│   └── temp                     # Temporary storage for file uploads
├── .env                         # Environment configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Documentation
```

---

## Dependencies

- **Express**: Web framework for building RESTful APIs.
- **Mongoose**: MongoDB object modeling for schema-based data management.
- **bcrypt**: Password hashing for secure user authentication.
- **jsonwebtoken**: Implementation of access and refresh tokens.
- **multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud storage service for storing media files.
- **cookie-parser**: Middleware to parse cookies for sessions.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.

---

## Development Dependencies

- **Nodemon**: Monitors changes in files and restarts the server automatically.
- **Prettier**: Ensures consistent code formatting.

---

## API Endpoints

### User Routes
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/user/register`  | Registers a new user       |

---

## Testing

- **Postman**: Used for testing the `/register` endpoint, ensuring proper request/response cycles.

---

## Future Enhancements

- Implement user authentication (login/logout).
- Add video upload and processing features.
- Enable paginated browsing for videos.
- Integrate user watch history and recommendations.

---

## License

This project is licensed under the ISC License.
```

### Notes:
- Update the repository URL under the "Clone the Repository" section.
- Add additional endpoints and features as they are implemented.
- This file is structured for easy expansion as your project grows.
