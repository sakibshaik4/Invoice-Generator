const { StockDao } = require("../dao");

const addStock = async (req, res, next) => {
  try {
    req.body.user = req.session.user._id;
    return res.json({
      success: true,
      message: "Stock added successfully",
      data: await StockDao.addStock(req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getStock = async (req, res, next) => {
  try {
    let query = { user: req.session.user._id };
    if (req?.query?.qty == "notZero") {
      console.log("two");
      query = { ...query, qty: { $gt: 0 } };
    } else {
      query = { ...query, ...req.query };
    }
    return res.json({
      success: true,
      message: "Stock fetched successfully",
      data: await StockDao.getStock(query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const updateStock = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Stock updated successfully",
      data: await StockDao.updateStock(req.query, req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const deleteStock = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Stock deleted successfully",
      data: await StockDao.deleteStock(req.query),
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
  addStock,
  getStock,
  updateStock,
  deleteStock,
};
