/**
 * Express é uma biblioteca que facilita o desenvolvimento de servidores,
 *  ainda mais quando se trata de Node JS. Com ela podemos implementar rotas,
 *  middlewares e gerenciadores de erros de forma fácil e prática.
 */
// Instância ddo Express, chamada app.
const express = require('express')
const app = express();

//passar a request como json:
app.use(express.json());

/**
 * O objeto express possui os métodos HTML's mais utilizados:
 * GET;
 * POST;
 * PUT;
 * DELETE;
 */

app.get("/", (request, response) => {
  response.send("Hello World!!")
})

/**
 * Middleware para not-found middleware
 * criamos um middleware como uma função que recebe 3 parâmetros:
 *  - A requisição;
 *  - A resposta;
 *  - A função que dá continuidade à cadeia.
 * É encarregada de:
 *  - Criar um erro referente a rota que foi requisitada;
 *  - Atribuir o HTTP Status correto para requisições que não encontraram o que procuravam;
 *  - Passar o erro para o próximo middleware da cadeia.
 * Ele precisa ser o último middleware para garantir que nenhum dos outros resolve a requisição;
 */

 app.use((request, response, next) => {
  const error = new Error(`Not found - ${request.originalUrl}`);
  response.status(404);
  next(error);
 });

/**
 * Importantes:
 * Crio uma constante PORT que recebe que porta o nosso app vai ouvir(listen)
 * a expressão '() => {}' é uma arrow-function 
 * Para interpolar componentes react com strings utiliza-se entre crases `${}`
 */
const PORT = 3333;
app.listen(PORT, ()=>{
  console.log(`Server running on port: ${PORT}`)
})