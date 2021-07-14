require('dotenv').config({ path: "./config.env" });
const express = require("express");
const cors = require('cors');

const connectDB = require("./database/db")
const errorHandler = require("./middleware/error")

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/auth',require('./routers/auth'));
app.use('/api/private',require('./routers/private'));

//error handler - (keep it at last after all routes & middlewares)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection",(err,promise) =>{
  console.log(`Logged error : ${err}`),
      server.close(()=> process.exit(1));
})
