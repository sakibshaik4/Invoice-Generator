const puppeteer = require("puppeteer-core");
const { createInvoice } = require("../util/invoiceTemplate");
const { SaleDao, StockDao } = require("../dao");

const addSale = async (req, res, next) => {
  try {
    req.body.user = req.session.user._id;
    for (let i = 0; i < req.body.items.length; i++) {
      await StockDao.updateStock(
        { item: req.body.items?.[i].item },
        { $inc: { qty: -req.body.items?.[i].qty } }
      );
    }
    return res.json({
      success: true,
      message: "Sale added successfully",
      data: await SaleDao.addSale(req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const getSale = async (req, res, next) => {
  try {
    req.query.user = req.session.user._id;
    return res.json({
      success: true,
      message: "Sale fetched successfully",
      data: await SaleDao.getSale(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const updateSale = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Sale updated successfully",
      data: await SaleDao.updateSale(req.query, req.body),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const deleteSale = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      message: "Sale deleted successfully",
      data: await SaleDao.deleteSale(req.query),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const generateInvoice = async (req, res, next) => {
  try {
    let saleId = req?.body?.id;
    const [saleData] = await SaleDao.getSale({_id: saleId});
    // return res.json(saleData);
    let htmlData = createInvoice(saleData);
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();
    await page.setContent(htmlData, {
      waitUntil: "networkidle0",
    });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res
      .status(200)
      .set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Invoice.pdf"',
        "Content-Length": Buffer.byteLength(pdfBuffer),
        "Content-Transfer-Encoding": "binary",
      })
      .end(Buffer.from(pdfBuffer), "binary");
  } catch (error) {
    res.json({ success: false, message: error?.message });
  }
};

module.exports = {
  addSale,
  getSale,
  updateSale,
  deleteSale,
  generateInvoice,
};
