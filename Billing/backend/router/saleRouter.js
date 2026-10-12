const express = require("express");
const { SaleController } = require("../controller");
const { checkSession } = require("../util/checkSession");

const saleRouter = express.Router();

saleRouter.get("/get-sale", checkSession, SaleController.getSale);
saleRouter.post("/add-sale", checkSession, SaleController.addSale);
saleRouter.put("/update-sale", checkSession, SaleController.updateSale);
saleRouter.delete("/delete-sale", checkSession, SaleController.deleteSale);
saleRouter.post(
  "/generate-invoice",
  checkSession,
  SaleController.generateInvoice
);

module.exports = saleRouter;
