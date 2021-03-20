// Initializes the `shoplists_joiners` service on path `/shoplists-joiners`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { ShoplistsJoiners } from "./shoplists_joiners.class";
import hooks from "./shoplists_joiners.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "shoplists-joiners": ShoplistsJoiners & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  // Initialize our service with any options it requires
  app.use(
    "/addJoinerToShoplist",
    new ShoplistsJoiners({
      users: app.service("users"),
      shoplists: app.service("shoplists"),
    }),
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("shoplists-joiners");

  service.hooks(hooks);
}
