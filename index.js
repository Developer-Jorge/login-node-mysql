const mysql = require("mysql");
const express = require("express");
const app = express();

//Creamos conexion con mysql
let conexion = mysql.createConnection({
    host: "localhost",
    database: "users",
    user: "root",
    password: "43988157"
});

//Motor de vistas para conectar el html con javascript
app.set("view engine", "ejs");

//Para que reconozca el html como objetos
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

//Crear ruta con el html
app.get("/", function (req, res) {
    res.render("login");
});

//Guardamos los datos del html
app.post("/value", async function (req, res) {
    const data = req.body;

    const first_name = data.first_name;
    const last_name = data.last_name;
    const email = data.email;

    let password = data.password;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send('Todos los campos son requeridos');
    }

    //Guardar los datos en la base de datos
    let insertar = "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    conexion.query(insertar, [first_name, last_name, email, password], function (error) {
        if (error) {
            console.error("Error al insertar datos:", error);
            return res.status(500).send("Error al insertar datos");
        }
        console.log("Datos cargados correctamente");
        res.send("Datos cargados correctamente");
    });
});





//Creacion de servidor local en puerto 3000
app.listen(3000,function(){
    console.log("Servidor funcionando");
});





