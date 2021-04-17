import app from "../../src/app";

describe("'shoplists_joiners' service", () => {
  it("registered the service", () => {
    const service = app.service("shoplists-joiners");
    expect(service).toBeTruthy();
  });
});
