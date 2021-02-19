// Initializes the `shoplists` service on path `/shoplists`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Shoplists } from './shoplists.class';
import createModel from '../../models/shoplists.model';
import hooks from './shoplists.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'shoplists': Shoplists & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/shoplists', new Shoplists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shoplists');

  service.hooks(hooks);
}
