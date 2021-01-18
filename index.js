const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Tarefa = require("./database/Tarefa");
//database

connection // autenticação obrigatoria
  .authenticate()
  .then(() => {
    console.log("conexao feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//Dizendo para o express usar o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body parser - obrigatorio

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas

//esta rota busca todos os dados do banco, o comando raw filtra apenas o que foi preenchido
//na tabela prlo programa, e o order, traz ordenado.

app.get("/", (req, res) => {
  Tarefa.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ASC = crescente e DESC = decrescente
    ],
  }).then((tarefas) => {
    res.render("index", {
      tarefas: tarefas,
    });
  });
});

app.get("/cadastrar", (req, res) => {
  res.render("cadastrar");
});


app.post("/salvartarefa", (req, res) => {
  var titulo = req.body.titulo;
  //var descricao = req.body.descricao;
  Tarefa.create({
    titulo: titulo,
   // descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/tarefa/delete", (req, res) =>{
   var id = req.body.id;
     Tarefa.destroy({
       where: { 
         id:id
       }
     }).then(() =>{
        res.redirect("/")
     });

});

app.listen(4000, () => {
  //Obrigatorio para o servidor rodar
  console.log("O servidor está funcionando!"); //opcional
});
