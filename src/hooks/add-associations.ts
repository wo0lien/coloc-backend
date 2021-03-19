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

    // sequelize.include = include.concat(
    //   options.models!.map((model) => {
    //     const newModel = { ...model };

    //     newModel.model = context.app.services[model.model].Model;
    //     return newModel;
    //   }),
    // );

    sequelize.include = { all: true };

    sequelize.raw = false;

    context.params.sequelize = sequelize;
    return context;
  };
};
