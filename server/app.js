require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const models = require('./models');
const moviesRouter = require('./routes/movies');

const app = express();

console.log(process.env.PG_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


app.use((err, req, res, next) => {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.json({
    message: '404 error'
  });
});


app.listen(4000, () => {
  console.log(`Server is running!`);
})