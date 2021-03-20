import { Application } from '../declarations';
import users from './users/users.service';
import shoplists from './shoplists/shoplists.service';
import products from './products/products.service';
import shoplistProducts from './shoplist_products/shoplist_products.service';
import productCategories from './product_categories/product_categories.service';
import stores from './stores/stores.service';
import shoplistsJoiners from './shoplists_joiners/shoplists_joiners.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(shoplists);
  app.configure(products);
  app.configure(shoplistProducts);
  app.configure(productCategories);
  app.configure(stores);
  app.configure(shoplistsJoiners);
}
