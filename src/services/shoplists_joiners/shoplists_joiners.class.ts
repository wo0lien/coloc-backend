import { BadRequest } from "@feathersjs/errors";
import { Params } from "@feathersjs/feathers";

export class ShoplistsJoiners {
  private models: any;

  constructor(models: any) {
    this.models = models || {};
  }

  create(data: { shoplistId: number; joinerId: number }, params?: Params) {
    if (isNaN(data.shoplistId)) {
      throw new BadRequest("Expected Number");
    } else if (isNaN(data.joinerId)) {
      throw new BadRequest("Expected Number");
    }
    return this.models.users
      .get(data.joinerId)
      .then((joiner: any) =>
        this.models.shoplists.get(data.joinerId).then((shoplist: any) => shoplist.addJoiners(joiner)),
      );
  }
}
