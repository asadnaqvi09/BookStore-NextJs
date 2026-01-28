# 📚 Online Book Store

A full‑stack online bookstore with a Next.js frontend and a Node.js/Express REST API. It supports authentication, catalog browsing, search & filter, cart, wishlist, and an admin interface for book management. Images are stored on Cloudinary and data persists in MongoDB Atlas.

## Features
- User auth via JWT httpOnly cookies
- Browse, search, and filter books
- Book details, cart, and wishlist
- Admin: add, update, delete books with image uploads
- Contact form with email delivery
- In progress: orders, payments, reviews

## Tech Stack
- Frontend: Next.js 16, React 19, Redux Toolkit, React Hook Form, Zod, Swiper, Toast
- Backend: Node.js, Express 5, Mongoose 8, JWT, Multer + Cloudinary, SendGrid/Nodemailer
- Database: MongoDB Atlas
- Dev tools: Nodemon, ESLint

## Monorepo Structure
- Backend API: [BackEnd/index.js](file:///a:/Development/Online-Book-Store/BackEnd/index.js), DB config: [db.config.js](file:///a:/Development/Online-Book-Store/BackEnd/config/db.config.js)
- Frontend app (Next.js): [FrontEnd/src/app](file:///a:/Development/Online-Book-Store/Frontend/src/app), Redux store: [store.js](file:///a:/Development/Online-Book-Store/Frontend/src/redux/store.js)

## Getting Started

Prerequisites:
- Node.js 18+ and npm
- MongoDB Atlas project & Cloudinary account

Setup:
```bash
# Clone
git clone <your-repo-url>
cd Online-Book-Store

# Backend
cd BackEnd
npm install
# .env (create)
# DB_USERNAME=...
# DB_PASSWORD=...
# JWT_SECRET=...
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...
# SMTP_EMAILS=...
# SMTP_APP_PASSWORDS=...
npm run dev    # runs on http://localhost:4000

# Frontend
cd ../Frontend
npm install
npm run dev    # runs on http://localhost:3000
```

Notes:
- CORS in the API allows http://localhost:3000 and 3001
- Frontend slices call the API at http://localhost:4000 (update to your prod URL when deploying)

## API Overview
- Auth: `/api/user/register`, `/login`, `/logout`, `/me`
- Books: `/api/book/getAllBooks`, `/getSingleBookByID/:id`, `/searchBooks`, admin: `/addBook`, `/updateBookByID/:id`, `/deleteBookByID/:id`
- Cart: `/api/cart` (GET), `/add`, `/update`, `/remove/:bookId`, `/clear`, `/increase/:productId`, `/decrease/:productId`
- Wishlist: `/api/wishList` (GET), `/add`, `/remove/:bookId`, `/toggleWishList`
- Contact: `/api/contact/create-contact`, `/get-contacts`, `/delete-contact/:id`

## Scripts
- Backend: `npm run dev`, `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm start`, `npm run lint`

## Roadmap
- Orders and payment integration (Stripe/PayPal)
- Reviews and ratings
- Email verification and password reset
- Rate limiting, security hardening, and tests