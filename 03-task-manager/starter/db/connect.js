const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
