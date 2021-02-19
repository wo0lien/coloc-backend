// Initializes the `product_categories` service on path `/product-categories`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ProductCategories } from './product_categories.class';
import createModel from '../../models/product_categories.model';
import hooks from './product_categories.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'product-categories': ProductCategories & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/product-categories', new ProductCategories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-categories');

  service.hooks(hooks);
}
