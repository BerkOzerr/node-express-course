require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");

app.use(express.json());

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 5000; //05.06.00
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Project use port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
