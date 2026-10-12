const { StockModel } = require("../model");

const addStock = async (data) => {
  try {
    return await StockModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getStock = async (query) => {
  try {
    return await StockModel.find(query)
      .populate([
        { path: "item", model: "item", select: "name price" },
        { path: "vendor", model: "vendor-customer", select: "name" },
      ])
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const updateStock = async (query, updateData) => {
  try {
    return await StockModel.findOneAndUpdate(query, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw error;
  }
};

const deleteStock = async (query) => {
  try {
    return await StockModel.findOneAndDelete(query).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = { addStock, getStock, updateStock, deleteStock };
