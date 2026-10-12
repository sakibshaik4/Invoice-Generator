const dayjs = require("dayjs");
const { UserDao, SaleDao, PurchaseDao } = require("../dao");

const addUser = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "User added successfully",
      data: await UserDao.addUser(req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "User fetched successfully",
      data: await UserDao.getUser(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "User updated successfully",
      data: await UserDao.updateUser(req.query, req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "User deleted successfully",
      data: await UserDao.deleteUser(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    let { phone, password } = req.body;
    if (!phone || !password) {
      throw new Error("Missing data!");
    }
    let [userData] = await UserDao.getUser(req.query);
    if (userData) {
      req.session.user = userData;
    }
    return res.json({
      success: userData ? true : false,
      message: userData ? "Authenticated successfully!" : "Invalid credentials",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const logout = async (req, res, next) => {
  try {
    await req.session.destroy();
    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const validateSession = async (req, res, next) => {
  try {
    return res.json({
      success: req?.session?.user ? true : false,
      message: req?.session?.user ? "Valid Session" : "Session Expired",
      data: req?.session?.user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const { fromDate, toDate } = req?.body;
    const user = req?.session?.user?._id;

    const salesList = await SaleDao.getSale({
      user: user,
      createdAt: {
        $gte: dayjs(fromDate).toDate(),
        $lte: dayjs(toDate).toDate(),
      },
    });
    const purchaseList = await PurchaseDao.getPurchase({
      user: user,
      createdAt: {
        $gte: dayjs(fromDate).toDate(),
        $lte: dayjs(toDate).toDate(),
      },
    });

    let totalSaleCost = 0;
    let totalPurchaseCost = 0;
    for (let i = 0; i < salesList?.length; i++) {
      totalSaleCost += salesList?.[i]?.totalPrice;
    }
    for (let i = 0; i < purchaseList?.length; i++) {
      totalPurchaseCost += purchaseList?.[i]?.totalPrice;
    }
    res.json({
      success: true,
      message: "Stats fetched successfully",
      data: {
        sales: salesList?.length,
        purchase: purchaseList?.length,
        totalSaleCost: totalSaleCost,
        totalPurchaseCost: totalPurchaseCost,
        profit: totalSaleCost - totalPurchaseCost,
      },
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
  addUser,
  getUser,
  updateUser,
  deleteUser,
  login,
  logout,
  validateSession,
  getDashboardStats,
};
