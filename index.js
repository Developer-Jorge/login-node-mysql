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
app.get("/", function(answer,request){
    request.render("login");
});

//Guardamos los datos del html
app.post("/value", function(answer,request){
    const data = answer.body;

    let email = data.email;
    let password = data.password;

    //Guardar los datos en la base de datos
    let insertar = "INSERT INTO user (email,password) VALUES ('"+email+"','"+password+"')";

    conexion.query(insertar, function(error){
        if(error) throw error;
        console.log("Datos cargados correctamente");
    });
});





//Creacion de servidor local en puerto 3000
app.listen(3000,function(){
    console.log("Servidor funcionando");
});





