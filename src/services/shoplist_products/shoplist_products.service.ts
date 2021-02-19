// Initializes the `shoplist_products` service on path `/shoplist-products`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ShoplistProducts } from './shoplist_products.class';
import createModel from '../../models/shoplist_products.model';
import hooks from './shoplist_products.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'shoplist-products': ShoplistProducts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/shoplist-products', new ShoplistProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shoplist-products');

  service.hooks(hooks);
}
