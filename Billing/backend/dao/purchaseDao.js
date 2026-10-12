const { PurchaseModel } = require("../model");

const addPurchase = async (data) => {
  try {
    return await PurchaseModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getPurchase = async (query) => {
  try {
    return await PurchaseModel.find(query)
      .populate([
        {
          path: "items.item",
          model: "item",
          select: "name",
        },
        {
          path: "vendor",
          model: "vendor-customer",
          select: "name",
        },
      ])
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const updatePurchase = async (query, updateData) => {
  try {
    return await PurchaseModel.findOneAndUpdate(query, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw error;
  }
};

const deletePurchase = async (query) => {
  try {
    return await PurchaseModel.findOneAndDelete(query).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = { addPurchase, getPurchase, updatePurchase, deletePurchase };
