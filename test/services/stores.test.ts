import app from "../../src/app";

describe("'stores' service", () => {
  it("registered the service", () => {
    const service = app.service("stores");
    expect(service).toBeTruthy();
  });
});
