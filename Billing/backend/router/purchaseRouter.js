const express = require("express");
const { PurchaseController } = require("../controller");
const { checkSession } = require("../util/checkSession");

const purchaseRouter = express.Router();

purchaseRouter.get(
  "/get-purchase",
  checkSession,
  PurchaseController.getPurchase
);
purchaseRouter.post(
  "/add-purchase",
  checkSession,
  PurchaseController.addPurchase
);
purchaseRouter.put(
  "/update-purchase",
  checkSession,
  PurchaseController.updatePurchase
);
purchaseRouter.delete(
  "/delete-purchase",
  checkSession,
  PurchaseController.deletePurchase
);

module.exports = purchaseRouter;
