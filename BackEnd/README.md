# 📚 Online Book Store Backend

A comprehensive Node.js/Express.js backend API for an Online Book Store application with full CRUD operations, user authentication, cart management, wishlist functionality, and admin panel features.

## 🚀 Features

### ✅ Implemented Features
- **User Authentication & Authorization**
  - User registration with email validation
  - Secure login/logout functionality
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password encryption with bcryptjs

- **Book Management**
  - Add, update, delete books (Admin only)
  - Get all books with pagination
  - Get single book details
  - Search and filter books
  - Book image upload with Cloudinary
  - Stock management
  - Best seller and sale status tracking

- **Shopping Cart**
  - Add/remove items from cart
  - Update cart quantities
  - Increase/decrease item quantities
  - Clear entire cart
  - Persistent cart storage

- **Wishlist Management**
  - Add/remove books to wishlist
  - Get user wishlist items

- **Contact System**
  - Contact form submission
  - Email notifications

- **Admin Panel**
  - Admin-only book management
  - User management capabilities
  - Stock monitoring

### 🏗️ Architecture Overview

```
BackEnd/
├── config/           # Database configuration
├── controllers/      # Business logic and request handlers
├── middleware/       # Authentication, error handling, file upload
├── models/          # MongoDB data models
├── routes/          # API endpoint definitions
├── seedData/        # Sample data for testing
├── utilis/          # Utility functions and helpers
├── index.js         # Application entry point
└── package.json     # Dependencies and scripts
```

## 📁 Project Structure & File Descriptions

### 🔧 Configuration Files

#### `config/db.config.js`
- **Purpose**: MongoDB database connection configuration
- **Functionality**: 
  - Establishes connection to MongoDB Atlas cluster
  - Uses environment variables for secure credentials
  - Implements connection retry logic

### 🎮 Controllers (Business Logic)

#### `controllers/booksController.js`
- **Purpose**: Handles all book-related operations
- **Functions**:
  - `getAllBooks()`: Retrieves books with pagination (8 books per page)
  - `addBook()`: Creates new book with image upload
  - `updateBookByID()`: Updates existing book details
  - `deleteBookByID()`: Removes book from database
  - `getSingleBookByID()`: Gets detailed book information
  - `searchFilterBooks()`: Advanced search and filtering

#### `controllers/userController.js`
- **Purpose**: User authentication and profile management
- **Functions**:
  - `registerUser()`: User registration with validation
  - `LoginUser()`: Secure login with JWT token generation
  - `LogoutUser()`: Clears authentication cookies
  - `getMe()`: Retrieves current user profile

#### `controllers/cartController.js`
- **Purpose**: Shopping cart management
- **Functions**:
  - `addToCart()`: Adds books to user cart
  - `removeFromCart()`: Removes specific items
  - `getCart()`: Retrieves user's cart contents
  - `updateCart()`: Modifies cart item quantities
  - `clearCart()`: Empties entire cart
  - `increaseQuantity()`: Increases item count
  - `decreaseQuantity()`: Decreases item count

#### `controllers/wishListController.js`
- **Purpose**: User wishlist management
- **Functions**:
  - `addToWishList()`: Adds books to wishlist
  - `getWishList()`: Retrieves user's wishlist
  - `removeFromWishList()`: Removes items from wishlist

#### `controllers/contactController.js`
- **Purpose**: Contact form handling
- **Functions**:
  - `contactUs()`: Processes contact form submissions
  - Sends email notifications

### 🔒 Middleware (Security & Utilities)

#### `middleware/authMiddleware.js`
- **Purpose**: Authentication and authorization
- **Functions**:
  - `protect()`: Verifies JWT tokens for protected routes
  - `adminOnly()`: Restricts access to admin users only

#### `middleware/errorMiddleware.js`
- **Purpose**: Global error handling
- **Functions**:
  - `notFound()`: Handles 404 errors
  - `errorHandler()`: Processes and formats error responses

#### `middleware/multerMiddleware.js`
- **Purpose**: File upload handling
- **Functionality**: 
  - Configures multer for image uploads
  - Supports multiple file uploads (up to 4 images)
  - Integrates with Cloudinary for cloud storage

### 📊 Data Models (MongoDB Schemas)

#### `models/bookModel.js`
- **Purpose**: Book data structure definition
- **Fields**:
  - `title`, `author`, `isbn` (required)
  - `price`, `discountPrice` (for sales)
  - `rating` (0-5 scale)
  - `genre`: Fiction, Non-Fiction, Science, History, Biography
  - `stock` (inventory management)
  - `bookImg` (array of image URLs)
  - `isBestSeller`, `isOnSale` (marketing flags)
  - `description`, `publisher`, `year`

#### `models/userModel.js`
- **Purpose**: User account structure
- **Fields**:
  - `userName`, `email`, `password` (required)
  - `role`: user/admin (default: user)
  - Password hashing with bcryptjs
  - Methods for password comparison

#### `models/cartModel.js`
- **Purpose**: Shopping cart structure
- **Fields**:
  - `user`: Reference to User model
  - `items`: Array of book items with quantities
  - `totalPrice`: Calculated cart total

#### `models/wishListModel.js`
- **Purpose**: User wishlist structure
- **Fields**:
  - `user`: Reference to User model
  - `items`: Array of referenced books

#### `models/orderModel.js`
- **Purpose**: Order tracking (schema defined)
- **Fields**:
  - User reference, order items, status tracking
  - Shipping and payment information

#### `models/contactModel.js`
- **Purpose**: Contact form submissions
- **Fields**:
  - `name`, `email`, `message` (required)
  - `subject`, `phone` (optional)

#### `models/reviewModel.js`
- **Purpose**: Book reviews and ratings
- **Fields**:
  - User and book references
  - `rating`, `comment`, `title`

### 🛣️ API Routes

#### `routes/authRoutes.js`
- **Endpoints**:
  - `POST /api/user/register` - User registration
  - `POST /api/user/login` - User login
  - `POST /api/user/logout` - User logout
  - `GET /api/user/me` - Get current user (protected)

#### `routes/bookRoutes.js`
- **Endpoints**:
  - `GET /api/book/getAllBooks` - Get all books (paginated)
  - `POST /api/book/addBook` - Add new book (admin only)
  - `GET /api/book/searchBooks` - Search and filter books
  - `PATCH /api/book/updateBookByID/:id` - Update book (admin only)
  - `DELETE /api/book/deleteBookByID/:id` - Delete book (admin only)
  - `GET /api/book/getSingleBookByID/:id` - Get single book details

#### `routes/cartRoutes.js`
- **Endpoints**:
  - `GET /api/cart/` - Get user cart (protected)
  - `POST /api/cart/add` - Add item to cart (protected)
  - `PATCH /api/cart/update` - Update cart item (protected)
  - `DELETE /api/cart/remove/:bookId` - Remove item (protected)
  - `DELETE /api/cart/clear` - Clear entire cart (protected)
  - `PUT /api/cart/increase/:productId` - Increase quantity (protected)
  - `PUT /api/cart/decrease/:productId` - Decrease quantity (protected)

#### `routes/wishListRoutes.js`
- **Endpoints**:
  - `GET /api/wishList/` - Get user wishlist (protected)
  - `POST /api/wishList/add` - Add to wishlist (protected)
  - `DELETE /api/wishList/remove/:bookId` - Remove from wishlist (protected)

#### `routes/contactRoutes.js`
- **Endpoints**:
  - `POST /api/contact/` - Submit contact form

### 🛠️ Utility Functions

#### `utilis/cloudinary.js`
- **Purpose**: Cloudinary configuration for image storage
- **Functionality**: Sets up cloud storage credentials

#### `utilis/email.js` & `utilis/sendEmail.js`
- **Purpose**: Email notification system
- **Functionality**: Sends emails using SendGrid/nodemailer

#### `utilis/generateToken.js`
- **Purpose**: JWT token generation
- **Functionality**: Creates secure tokens with user data

#### `utilis/validator.js`
- **Purpose**: Input validation utilities
- **Functions**:
  - `isEmailValid()`: Email format validation
  - `isStrongPassword()`: Password strength checking
  - `isDisposableEmail()`: Disposable email detection

#### `utilis/response.js`
- **Purpose**: Standardized API responses
- **Functionality**: Consistent response formatting

#### `utilis/refreshToken.js`
- **Purpose**: Token refresh mechanism
- **Functionality**: Handles JWT token refresh

### 🌱 Sample Data

#### `seedData/seedBooks.js`
- **Purpose**: Sample book data for testing
- **Functionality**: Populates database with initial book entries

## 🛠️ Tech Stack

### Core Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Security & Authentication
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing

### File Handling
- **Multer**: File upload middleware
- **Cloudinary**: Cloud-based image storage

### Email Services
- **@sendgrid/mail**: Email delivery service
- **nodemailer**: Email sending library

### Development Tools
- **nodemon**: Development server auto-restart
- **morgan**: HTTP request logger
- **dotenv**: Environment variable management

## 🔧 Environment Variables

Create a `.env` file in the root directory with:

```env
# Database
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key

# Server
NODE_ENV=development
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BackEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create `.env` file with required variables
   - Configure MongoDB, Cloudinary, and email services

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **For production**
   ```bash
   npm start
   ```

## 📊 API Documentation

### Authentication Flow
1. User registers with email and password
2. System validates input and creates account
3. User logs in to receive JWT token
4. Token is stored in HTTP-only cookie
5. Protected routes verify token for access

### Book Management Flow
1. Admin users can add books with images
2. Images are uploaded to Cloudinary
3. Book data is stored in MongoDB
4. Users can browse, search, and view books
5. Cart and wishlist functionality available

## 🔒 Security Features

- **Password Security**: bcryptjs hashing with salt
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Express-validator for data sanitization
- **CORS Protection**: Configured for specific origins
- **HTTP-only Cookies**: Secure token storage
- **Role-based Access**: Admin/user permission levels

## 🧪 Testing

The application includes sample data and can be tested using:
- Postman/Insomnia for API testing
- Frontend integration with Next.js frontend
- MongoDB Compass for database inspection

## 📝 Future Enhancements

- Payment gateway integration
- Order processing and tracking
- Advanced search and filtering
- User profile management
- Review and rating system
- Email notifications
- Admin dashboard analytics
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and queries, please contact the development team.

---

**Note**: This backend API is designed to work with the corresponding Next.js frontend application. Ensure both are properly configured for full functionality.