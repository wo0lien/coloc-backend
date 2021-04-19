import { Id, NullableId, Paginated, Params, ServiceMethods } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Users } from "../users/users.class";
import { Shoplists } from "../shoplists/shoplists.class";
import { BadRequest } from "@feathersjs/errors";

interface Data {}

interface ServiceOptions {
  users: Users;
  shoplists: Shoplists;
}

export class ShoplistsJoiners implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  // TODO refactor with better Promise understanding
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: { shoplistId: number; joinerId: number }, params?: Params): Promise<any> {
    try {
      const s = await this.options.shoplists.Model.findByPk(data.shoplistId);
      const j = await this.options.users.Model.findByPk(data.joinerId);
      await s.addJoiner(j);
      return data;
    } catch (err) {
      throw new BadRequest("Arguments does not match the database entries");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
