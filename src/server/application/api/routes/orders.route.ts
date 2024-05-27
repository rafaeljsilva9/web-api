import { Request, Response, Router } from "express";
import { Database } from "../../infra/database";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  const database = await Database.getInstance();
  const ordersCollection = database.getCollection(Database.ORDERS_COLLECTION);
  const orders = ordersCollection.chain().find().data({ removeMeta: true });
  res.status(200).send(orders);
});

routes.post("/", async (req: Request, res: Response) => {
  const database = await Database.getInstance();
  const ordersCollection = database.getCollection(Database.ORDERS_COLLECTION);

  const newUser = ordersCollection.insert(req.body);
  res.status(201).json(newUser);
});

routes.put("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const database = await Database.getInstance();
  const ordersCollection = database.getCollection(Database.ORDERS_COLLECTION);

  const user = ordersCollection.get(req.params.id);
  if (user) {
    ordersCollection.update({ ...user, ...req.body });
    res.json({ message: "Usuário atualizado com sucesso" });
  } else {
    res.status(404).json({ error: "Usuário não encontrado" });
  }
});

routes.delete("/:id", async (req: Request<{ id: number }>, res: Response) => {
  const database = await Database.getInstance();
  const ordersCollection = database.getCollection(Database.ORDERS_COLLECTION);

  const user = ordersCollection.get(req.params.id);
    if (user) {
        ordersCollection.remove(user);
        res.json({ message: 'Usuário removido com sucesso' });
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

export default routes;
