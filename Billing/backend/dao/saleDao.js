const { SaleModel } = require("../model");

const addSale = async (data) => {
  try {
    return await SaleModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getSale = async (query) => {
  try {
    return await SaleModel.find(query).populate([
      {
        path: "items.item",
        model: "item",
        select: "name price"
      },
      {
        path: "customer",
        model: "vendor-customer",
        select: "name gst phone address"
      },
      {
        path: "user",
        model: "user",
        select: "companyName companyContact phone gst address"
      }
    ]).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateSale = async (query, updateData) => {
  try {
    return await SaleModel.findOneAndUpdate(query, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw error;
  }
};

const deleteSale = async (query) => {
  try {
    return await SaleModel.findOneAndDelete(query).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = { addSale, getSale, updateSale, deleteSale };
