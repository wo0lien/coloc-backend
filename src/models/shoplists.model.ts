// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const shoplists = sequelizeClient.define(
    "shoplists",
    {
      // Should be automatic but writing it makes it clear
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      items: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      maxPeople: {
        type: DataTypes.INTEGER,
      },
      transportMode: {
        type: DataTypes.STRING,
        defaultValue: "feet",
      },
      shoppingDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (shoplists as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    shoplists.belongsTo(models.users, { as: "owner" });
    shoplists.belongsTo(models.stores, { as: "store" });
    shoplists.belongsToMany(models.users, { through: "shoplists_joiners", as: "joiners", foreignKey: "joinersId" });
    shoplists.hasMany(models.shoplist_products, { as: "products" });
  };

  return shoplists;
}
