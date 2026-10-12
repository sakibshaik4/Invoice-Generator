const { PurchaseDao, StockDao } = require("../dao");

const addPurchase = async (req, res, next) => {
  try {
    req.body.user = req.session.user._id;
    for (let i = 0; i < req.body.items.length; i++) {
      await StockDao.updateStock(
        { item: req.body.items?.[i].item },
        { $inc: { qty: req.body.items?.[i].qty } }
      );
    }
    return res.json({
      success: true,
      message: "Purchase added successfully",
      data: await PurchaseDao.addPurchase(req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getPurchase = async (req, res, next) => {
  try {
    req.query.user = req.session.user._id;
    return res.json({
      success: true,
      message: "Purchase fetched successfully",
      data: await PurchaseDao.getPurchase(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const updatePurchase = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Purchase updated successfully",
      data: await PurchaseDao.updatePurchase(req.query, req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const deletePurchase = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Purchase deleted successfully",
      data: await PurchaseDao.deletePurchase(req.query),
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
  addPurchase,
  getPurchase,
  updatePurchase,
  deletePurchase,
};
