const { ItemDao, StockDao } = require("../dao");

const addItem = async (req, res, next) => {
  try {
    req.body.user = req.session.user._id;
    let savedItem = await ItemDao.addItem(req.body);
    await StockDao.addStock({
      user: req.body.user,
      item: savedItem?._id,
      vendor: savedItem?.vendor,
    });
    return res.json({
      success: true,
      message: "Item added successfully",
      data: savedItem,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getItem = async (req, res, next) => {
  try {
    req.query.user = req.session.user._id;
    return res.json({
      success: true,
      message: "Item fetched successfully",
      data: await ItemDao.getItem(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const updateItem = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Item updated successfully",
      data: await ItemDao.updateItem(req.query, req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const deleteItem = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Item deleted successfully",
      data: await ItemDao.deleteItem(req.query),
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
  addItem,
  getItem,
  updateItem,
  deleteItem,
};
