import app from './routes/routes';

const port = 3000;

/** Start server */
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
