const checkSession = (req, res, next) => {
  try {
    if (!req?.session?.user) {
      return res.json({
        success: false,
        message: "Session Expired!",
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error?.message,
    });
  }
};

module.exports = { checkSession };
