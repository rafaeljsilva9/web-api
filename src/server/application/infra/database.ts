import Loki from "lokijs";
import initialData from "../../../resources/data.json";

export class Database {
  public static readonly DATABASE_NAME = 'fast-database.db';
  public static readonly ORDERS_COLLECTION = 'orders';
  private static database: Loki;

  public static async getInstance() {
    if (!this.database) {
      this.database = new Loki(Database.DATABASE_NAME);
      const ordersCollection = this.database.addCollection(Database.ORDERS_COLLECTION);
      initialData.forEach((order: any) => ordersCollection.insert(order));
    }
    return this.database;
  }
}
