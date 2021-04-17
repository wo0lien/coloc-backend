// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: { models: Array<any> | undefined }): Hook => {
  if (!options.models) {
    options.models = [];
  }
  return async (context: HookContext): Promise<HookContext> => {
    const sequelize = context.params.sequelize || {};
    const include = sequelize.include || [];

    sequelize.include = includeConcat(sequelize.include, include, context, options.models);

    sequelize.raw = false;

    context.params.sequelize = sequelize;
    return context;
  };
};

// Recursive include function
function includeConcat(target: any, source: any, context: HookContext, models: any): any {
  target = source.concat(
    models
      .filter((model: any) => {
        return context.app.services[model.model];
      })
      .map((model: any) => {
        const newModel = { ...model, attributes: { exclude: ["createdAt", "updatedAt", "password"] } };
        if (model.include) {
          newModel.include = includeConcat(newModel.include, [], context, model.include);
        }
        newModel.model = context.app.services[model.model].Model;
        return newModel;
      }),
  );
  return target;
}
