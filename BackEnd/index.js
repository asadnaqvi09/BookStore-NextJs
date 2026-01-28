const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishListRoutes = require('./routes/wishListRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app = express();
const PORT = 4000;
const connectWithDb = require('./config/db.config');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
dotEnv.config();
connectWithDb();

app.use('/api/user', authRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishList', wishListRoutes)
app.use('/api/contact', contactRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
