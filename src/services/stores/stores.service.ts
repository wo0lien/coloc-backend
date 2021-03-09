// Initializes the `stores` service on path `/stores`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Stores } from './stores.class';
import createModel from '../../models/stores.model';
import hooks from './stores.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'stores': Stores & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/stores', new Stores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stores');

  service.hooks(hooks);
}
