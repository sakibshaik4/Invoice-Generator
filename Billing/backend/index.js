require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const {
  ItemRouter,
  PurchaseRouter,
  SaleRouter,
  StockRouter,
  UserRouter,
  VendorCustomerRouter,
} = require("./router");

const app = express();

const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDb connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, res, next) => {
  console.log(`${new Date()} :: ${req?.method} :: ${req.path}`);
  next();
});

app.get("/", (req, res, next) => {
  res.json({ success: true, message: "Server is up and running" });
});

app.use("/item", ItemRouter);
app.use("/purchase", PurchaseRouter);
app.use("/sale", SaleRouter);
app.use("/stock", StockRouter);
app.use("/user", UserRouter);
app.use("/vendor-customer", VendorCustomerRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
