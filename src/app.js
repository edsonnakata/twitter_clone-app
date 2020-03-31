/**
 * Express é uma biblioteca que facilita o desenvolvimento de servidores,
 *  ainda mais quando se trata de Node JS. Com ela podemos implementar rotas,
 *  middlewares e gerenciadores de erros de forma fácil e prática.
 */
// Instância ddo Express, chamada app.
const express = require('express')
const app = express();

/**
 * proteger nossa aplicação de ataques, utilizaremos o CORS – sigla para Cross-origin resource sharing
 * – que nos permite determinar uma origem de onde aceitaremos as requests e bloquear as que não são bem-vindas.
 * Rodar no terminal 'yarn add cors'
 */
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

/**
 * utilização da middleware morgan
 * onde todas as requisições, que chegarem ao nosso servidor, criarão um registro (log)
 * contendo informações importantes como IP, hora, método, URL e status para que possamos corrigir bugs,
 * analisar e tomar decisões em cima dos dados.
 * 
 * Para isso digitar no terminal 'yarn add morgan'
 */
const morgan = require('morgan');
app.use(morgan("common"));

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
 * Criando um middleware para mostrar os erros que forem encontrados durante o desenvolvimento
 * sem ser a falta de uma rota;
 */

app.use((error, request, response, next) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;

  response.statusCode = statusCode;
  response.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? ":p" : error.stack
  });
});

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