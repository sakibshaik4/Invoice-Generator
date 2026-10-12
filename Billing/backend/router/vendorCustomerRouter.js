const express = require("express");
const { VendorCustomerController } = require("../controller");
const { checkSession } = require("../util/checkSession");

const vendorCustomerRouter = express.Router();

vendorCustomerRouter.get(
  "/get-vendorCustomer",
  checkSession,
  VendorCustomerController.getVendorCustomer
);
vendorCustomerRouter.post(
  "/add-vendorCustomer",
  checkSession,
  VendorCustomerController.addVendorCustomer
);
vendorCustomerRouter.put(
  "/update-vendorCustomer",
  checkSession,
  VendorCustomerController.updateVendorCustomer
);
vendorCustomerRouter.delete(
  "/delete-vendorCustomer",
  checkSession,
  VendorCustomerController.deleteVendorCustomer
);

module.exports = vendorCustomerRouter;
