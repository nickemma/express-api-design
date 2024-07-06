# Chronos Pro

Chronos Pro is a cutting-edge time management and productivity application designed to help modern professionals streamline their daily schedules, optimize workflows, and achieve their goals with greater efficiency.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Task Management:** Create, update, and delete tasks with ease.
- **Scheduling:** Plan your daily, weekly, and monthly schedules.
- **Reminders:** Set reminders for important tasks and deadlines.
- **Analytics:** Track your productivity and analyze your time usage.
- **Collaboration:** Share your schedule and tasks with team members.
- **User Authentication:** Secure login and registration.

## Installation

To get started with Chronos Pro, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nickemma/express-api-design.git
   cd express-api-design
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables:

   ```
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   DATABASE_URL=your_database_url
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can access the application at `http://localhost:5000`.

- **Register a new user:** POST `/user/register` with `email`, `name`, and `password`.
- **Login:** POST `/user/login` with `email` and `password`.
- **Forgot Password:** POST `/user/forgotpassword` with `email`.
- **Update User Details:** POST `/user/userdetails` with `email`, `currentPassword`, `newPassword`, and `newName`, updates are `Optional`.
- **Reset Password:** POST `/user/resetpassword` with `email` and `Link Sent To User Email`.
- **Create a product:** POST `/api/product` with `title`, `description`, and `name`.

## API Endpoints For User

Here are some of the main API endpoints available in Chronos Pro:

- **User Registration:** `POST /user/register`
- **User Login:** `POST /user/login`
- **Forgot Password:** `POST /user/forgotpassword`
- **Update UserDetails:** `POST /user/userdetails`
- **Reset Password:** `POST /user/resetpassword`

## API Endpoints For Product

- **Get Product:** `GET /api/product`
- **Create Product:** `POST /api/product`
- **Update Product:** `PUT /api/product/:id`
- **Get Product:** `GET /api/product/:id`
- **Delete Product:** `DELETE /api/product/:id`

## API Endpoints For Update

- **Get Updates:** `GET /api/update`
- **Create Update:** `POST /api/update`
- **Update Update:** `PUT /api/update/:id`
- **Get Update:** `GET /api/update/:id`
- **Delete Update:** `DELETE /api/update/:id`

For detailed API documentation, refer to the [API Documentation](docs/API.md).

## 👤 Author <a name="author"></a>

👤 **Nicholas Emmanuel**

- GitHub: [@NickEmma](https://github.com/NickEmma)
- Twitter: [@techieEmma](https://twitter.com/techieEmma)
- LinkedIn: [@Nicholas Emmanuel](https://www.linkedin.com/in/techieemma/)

## Contributing

We welcome contributions to Chronos Pro! To contribute, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit them:**
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request.**

Please make sure your code follows our coding standards and includes appropriate tests.

## License

Chronos Pro is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

### Nicholas Emmanuel

 <div align="center">
 <a href="https://www.linkedin.com/in/techieemma/"><img src="https://img.shields.io/badge/linkedin-%23f78a38.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin"></a> 
 <a href="https://twitter.com/techieEmma"><img src="https://img.shields.io/badge/Twitter-%23f78a38.svg?style=for-the-badge&logo=Twitter&logoColor=white" alt="Twitter"></a> 
 <a href="https://github.com/nickemma/"><img src="https://img.shields.io/badge/github-%23f78a38.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github"></a> 
 <a href="https://medium.com/@nicholasemmanuel321"><img src="https://img.shields.io/badge/Medium-%23f78a38.svg?style=for-the-badge&logo=Medium&logoColor=white" alt="Medium"></a> 
 <a href="mailto:nicholasemmanuel321@gmail.com"><img src="https://img.shields.io/badge/Gmail-f78a38?style=for-the-badge&logo=gmail&logoColor=white" alt="Linkedin"></a>
 </div>

## Acknowledgments

- [Creator](https://chronos.framer.website/) for the inspiration for this project.
