import { json, urlencoded } from "body-parser";
import express from "express";

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(json());
app.use(urlencoded({ extended: true }));

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Hello Word!')
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;