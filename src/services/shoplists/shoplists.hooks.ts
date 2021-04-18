import * as authentication from "@feathersjs/authentication";
import addAssociations from "../../hooks/add-associations";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [
      addAssociations({
        models: [
          { model: "users", as: "owner" },
          { model: "stores", as: "store" },
          { model: "users", as: "joiners" },
          { model: "shoplist-products", as: "products", include: [{ model: "products", as: "product" }] },
        ],
      }),
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
