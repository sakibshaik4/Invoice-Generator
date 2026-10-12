const dayjs = require("dayjs");
const createInvoice = (payload) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <div class="row p-0 m-0">
      <div class="col-md-12 display-3 d-flex justify-content-center">
        Invoice
      </div>
      <div class="col-md-12 h5 d-flex justify-content-end">
        Date: ${dayjs(payload?.createdAt).format("DD-MMM-YY")}
      </div>
      <div class="col-md-12 p-0 m-0 card border shadow">
        <div class="row p-3">
          <div class="col-md-6 p-0 m-0">
            <p>Company Name: ${payload?.user?.companyName ?? "NA"}</p>
            <p>GST Number: ${payload?.user?.gst ?? "NA"}</p>
            <p>Address: ${payload?.user?.address ?? "NA"}</p>
            <p>Phone: ${payload?.user?.phone ?? "NA"}</p>
          </div>
          <div class="col-md-6 p-0 m-0">
            <p>Customer Name: ${payload?.customer?.name ?? "NA"}</p>
            <p>GST Number: ${payload?.customer?.address ?? "NA"}</p>
            <p>Phone: ${payload?.customer?.phone ?? "NA"}</p>
          </div>
        </div>
      </div>

      <div class="col-md-12 p-0 m-0 card border shadow p-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
          ${payload?.items?.map((ele, index) => {
            return `<tr>
              <td>${index + 1}</td>
              <td>${ele?.item?.name}</td>
              <td>${ele?.qty}</td>
              <td>${parseInt(ele?.item?.price) * parseInt(ele?.qty)}</td>
            </tr>`;
          })}<tr>
              <td></td>
              <td></td>
              <td>Net Price</td>
              <td>${payload?.netPrice}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>GST Rate</td>
              <td>${payload?.gst}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Total Price</td>
              <td>${payload?.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

`;
};

module.exports = { createInvoice };
