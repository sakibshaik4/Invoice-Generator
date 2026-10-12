const { ItemModel } = require("../model");

const addItem = async (data) => {
  try {
    return await ItemModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getItem = async (query) => {
  try {
    return await ItemModel.find(query)
      .populate({
        path: "vendor",
        model: "vendor-customer",
        select: "name",
      })
      .lean()
      .exec();
  } catch (error) {
    throw error;
  }
};

const updateItem = async (query, updateData) => {
  try {
    return await ItemModel.findOneAndUpdate(query, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (query) => {
  try {
    return await ItemModel.findOneAndDelete(query).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = { addItem, getItem, updateItem, deleteItem };
