import { BadRequest } from "@feathersjs/errors";
import app from "../../src/app";

describe("'shoplists_joiners' service", () => {
  it("registered the service", () => {
    const service = app.service("shoplists-joiners");
    expect(service).toBeTruthy();
  });

  describe("methods", () => {
    const service = app.service("shoplists-joiners");

    it("call the find method", () => {
      const output = service.find();
      expect(output).toBeInstanceOf(Promise);
    });
    it("call the get method", () => {
      const output = service.get(1);
      expect(output).toBeInstanceOf(Promise);
    });

    it("call the update method", () => {
      const output = service.update(1, {});
      expect(output).toBeInstanceOf(Promise);
    });

    it("call the patch method", () => {
      const output = service.patch(1, {});
      expect(output).toBeInstanceOf(Promise);
    });

    it("call the remove method", () => {
      const output = service.remove(1, {});
      expect(output).toBeInstanceOf(Promise);
    });

    describe("create", () => {
      // TODO further testing
      it("call the create method with non-existing item Id", async () => {
        const input = { shoplistId: 1, joinerId: 1 };
        await expect(service.create(input)).rejects.toThrow(BadRequest);
      });

      it("call the create method with valid values", async () => {
        const mockAddJoiner = jest.fn(() => {
          return Promise.resolve();
        });

        const mockFindByPk = jest.fn(() => {
          return Promise.resolve({ addJoiner: mockAddJoiner });
        });

        service.options.shoplists.Model.findByPk = mockFindByPk;
        service.options.users.Model.findByPk = mockFindByPk;

        const input = { shoplistId: 1, joinerId: 1 };
        await expect(service.create(input)).resolves.toBe(input);
      });
    });
  });
});
