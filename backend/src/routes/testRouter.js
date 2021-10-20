import { Router } from 'express';
import { connection } from '../db/dbConnection';

const testRouter = new Router();

testRouter.get('/', (req,res) => {
    connection.query(
      'CALL dadosPaciente();',
      function(err, results) {
        res.json(results);
      }
    );
});
testRouter.get('/relatorio/:email', (req,res) => {
  const {email} = req.params;
  const query = `CALL relatorioPaciente('${email}');`
  connection.query(
    query,
    function(err, results) {
      res.json(results);
    }
  );
});
export default testRouter;
