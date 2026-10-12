const { VendorCustomerModel } = require("../model");

const addVendorCustomer = async (data) => {
  try {
    return await VendorCustomerModel.create(data);
  } catch (error) {
    throw error;
  }
};

const getVendorCustomer = async (query) => {
  try {
    return await VendorCustomerModel.find(query).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateVendorCustomer = async (query, updateData) => {
  try {
    return await VendorCustomerModel.findOneAndUpdate(query, updateData, {
      new: true,
    }).exec();
  } catch (error) {
    throw error;
  }
};

const deleteVendorCustomer = async (query) => {
  try {
    return await VendorCustomerModel.findOneAndDelete(query).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addVendorCustomer,
  getVendorCustomer,
  updateVendorCustomer,
  deleteVendorCustomer,
};
