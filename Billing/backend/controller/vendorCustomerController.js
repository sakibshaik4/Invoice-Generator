const { VendorCustomerDao } = require("../dao");

const addVendorCustomer = async (req, res, next) => {
  try {
    req.body.user = req.session.user._id;
    return res.json({
      success: true,
      message: "VendorCustomer added successfully",
      data: await VendorCustomerDao.addVendorCustomer(req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getVendorCustomer = async (req, res, next) => {
  try {
    req.query.user = req.session.user._id;
    return res.json({
      success: true,
      message: "VendorCustomer fetched successfully",
      data: await VendorCustomerDao.getVendorCustomer(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const updateVendorCustomer = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "VendorCustomer updated successfully",
      data: await VendorCustomerDao.updateVendorCustomer(req.query, req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const deleteVendorCustomer = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "VendorCustomer deleted successfully",
      data: await VendorCustomerDao.deleteVendorCustomer(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

module.exports = {
  addVendorCustomer,
  getVendorCustomer,
  updateVendorCustomer,
  deleteVendorCustomer,
};
