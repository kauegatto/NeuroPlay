import app from './app.js';
const port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log('Iniciando backend...');
  console.log(`Escutando no endereço: http://localhost:${port}`);
});
