const express = require("express");
const { ItemController } = require("../controller");
const { checkSession } = require("../util/checkSession");

const itemRouter = express.Router();

itemRouter.get("/get-item", checkSession, ItemController.getItem);
itemRouter.post("/add-item", checkSession, ItemController.addItem);
itemRouter.put("/update-item", checkSession, ItemController.updateItem);
itemRouter.delete("/delete-item", checkSession, ItemController.deleteItem);

module.exports = itemRouter;
