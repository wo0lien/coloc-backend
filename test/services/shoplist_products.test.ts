import app from "../../src/app";

describe("'shoplist_products' service", () => {
  it("registered the service", () => {
    const service = app.service("shoplist-products");
    expect(service).toBeTruthy();
  });
});
