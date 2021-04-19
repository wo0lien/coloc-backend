import app from "../../src/app";
import addAssociations, { testable } from "../../src/hooks/add-associations";
import { HookContext } from "@feathersjs/feathers";
import { createMock } from "ts-auto-mock";
import "jest-extended";

describe("add-association", () => {
  // import hook
  describe("includeConcat", () => {
    it("should return an empty array from empty source and target ", () => {
      const input: Array<any> = [];
      const output = testable.includeConcat([], app, input);
      expect(output).toBeInstanceOf(Array);
      expect(output.length).toEqual(0);
    });

    it("should add a model to an empty source with valid model", () => {
      const input = [{ model: "users", as: "owner" }];
      const output = testable.includeConcat([], app, input);

      expect(output).toBeInstanceOf(Array);
      expect(output.length).toEqual(1);
      expect(output[0]).toHaveProperty("model");
      expect(output[0]).toHaveProperty("as", "owner");
      expect(output[0]).toHaveProperty("attributes");
    });

    it("should add a model to a non-empty source", () => {
      const input = [{ model: "products", as: "p" }];
      const source = testable.includeConcat([], app, [{ model: "users", as: "owner" }]);
      const output = testable.includeConcat(source, app, input);

      expect(output[0]).toContainAllKeys(["model", "as", "attributes"]);
      expect(output[1]).toContainAllKeys(["model", "as", "attributes"]);
    });

    it("should add a model with nested include to an empty source", () => {
      const input = [{ model: "products", as: "p", include: [{ model: "users", as: "owner" }] }];
      const output = testable.includeConcat([], app, input);

      expect(output).toBeInstanceOf(Array);
      expect(output.length).toEqual(1);
      expect(output[0]).toContainAllKeys(["model", "as", "attributes", "include"]);
      expect(output[0].include[0]).toContainAllKeys(["model", "as", "attributes"]);
    });
  });

  describe("addAssociation", () => {
    it("should wrap the output of mocked includeConcat function", async () => {
      const input = { models: [] };
      const mockCtx = createMock<HookContext>();
      const includeConcatMock = jest.fn(() => {
        return [];
      });

      testable.includeConcat = includeConcatMock;
      const ctx = await addAssociations(input)(mockCtx);
      if (ctx) {
        expect(ctx.params.sequelize.include).toEqual([]);
        expect(includeConcatMock.mock.calls.length).toBe(1);
      } else {
        fail();
      }
    });
  });
});
