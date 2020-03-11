// configurando o servidor
const express = require("express")
const server = express()

// configurar servidor para apresentação de arquivos estaticos
server.use(express.static('public'))

// habilitar body do formulario

server.use(express.urlencoded({extended: true }))

// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

// lista de doadores

const donors = [
    {
        name:"André Tavares",
        blood: "A+"
    },
    {
        name:"Edisio Neto",
        blood: "B-"
    }
]


// configurar a apresentação da pagina
server.get("/", (req,res) => {
    return res.render("index.html", { donors })
})

server.post("/", (req,res) => {
    // pegar os arquivos do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // colocando valores do array
    donors.push({name,blood})

    return res.redirect("/")
    
})


// ligar o servidor na porta 3000
server.listen(3000, () => {
    console.log("servidor operando...")
});
