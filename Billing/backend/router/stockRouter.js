const express = require("express");
const { StockController } = require("../controller");
const { checkSession } = require("../util/checkSession");

const stockRouter = express.Router();

stockRouter.get("/get-stock", checkSession, StockController.getStock);
stockRouter.post("/add-stock", checkSession, StockController.addStock);
stockRouter.put("/update-stock", checkSession, StockController.updateStock);
stockRouter.delete("/delete-stock", checkSession, StockController.deleteStock);

module.exports = stockRouter;
