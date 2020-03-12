// configurando o servidor
const express = require("express")
const server = express()

// configurar servidor para apresentação de arquivos estaticos
server.use(express.static('public'))

// habilitar body do formulario

server.use(express.urlencoded({extended: true }))


// configurar conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '7865',
    host: 'localhost',
    port: 5432,
    database: 'doe',
    
})

// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})


// configurar a apresentação da pagina
server.get("/", (req,res) => {
    const query = `SELECT * FROM donors`

    db.query(query, (err, result) => {
        if(err) return res.send(err, "erro de banco de dados")

        const donors = result.rows
        return res.render("index.html", { donors })
    })
    
})

server.post("/", (req,res) => {
    // pegar os arquivos do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood == "") {
        return res.send("TODOS OS CAMPOS SÃO OBRIGATÓRIOS, POR FAVOR VOLTE E CONFIRA OS CAMPOS.")
    }

    // colocando valores dentro do banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES($1, $2, $3)`

    const values = [name,email,blood]

    db.query(query, values, (err) => {
        if(err) return res.send(err, "erro de banco de dados")

        return res.redirect("/")
    })

    
    
})


// ligar o servidor na porta 3000
server.listen(3000, () => {
    console.log("servidor operando...")
});
