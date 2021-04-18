// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext, Application } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: { models: Array<any> }): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const sequelize = context.params.sequelize || {};
    const include = sequelize.include || [];

    sequelize.include = testable.includeConcat(include, context.app, options.models);

    sequelize.raw = false;

    context.params.sequelize = sequelize;
    return context;
  };
};

// Recursive include function
function includeConcat(source: Array<any>, app: Application<any>, models: Array<any>): any {
  source = source.concat(
    models
      .filter((model: any) => {
        return app.services[model.model];
      })
      .map((model: any) => {
        const newModel = { ...model, attributes: { exclude: ["createdAt", "updatedAt", "password"] } };
        newModel.model = app.services[model.model].Model;
        if (model.include) {
          newModel.include = includeConcat([], app, model.include);
        }
        return newModel;
      }),
  );
  return source;
}

export const testable = {
  includeConcat,
};
