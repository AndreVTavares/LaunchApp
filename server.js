// configurando o servidor
const express = require("express")
const server = express()


// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})


// configurar a apresentação da pagina
server.get("/", (req,res) => {
    return res.render("index.html")
})


// ligar o servidor na porta 3000
server.listen(3000, () => {
    console.log("servidor operando...")
});
