const express = require("express");
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const app = express();

//Se capturan los datos de url encoded del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/resource", express.static("public"));
app.use("/resource", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

app.get("/recordar", (req, res) => {
    res.render("index", { msg: "Esta es la prueba" });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async(req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const date = req.body.date;
    const direccion = req.body.direccion;

    res.send(
        "USUARIO REGISTRADO CON EXITO!!! <br><br> <table><tr><td>nombre</td><td>apellido</td><td>date</td><td>direccion</td></tr><tr><td>" +
        nombre +
        "</td><td>" +
        apellido +
        "</td><td>" +
        date +
        "</td><td>" +
        direccion +
        "</td></tr></table>"
    );
});

app.post("/auth", async(req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    if (user == "cajasan" && password == "cajasan") {
        res.render("register");
    } else {
        res.send("credenciales incorrectas");
    }
});

app.post("/correo", async(req, res) => {
    const rol = req.body.rol;
    const usuario = req.body.usuario;
    const email = req.body.email;

    if (
        rol == "cliente" &&
        usuario == "cajasan" &&
        email == "prueba@prueba.com"
    ) {
        res.send(
            "Fue enviado el correo prueba@prueba.com con el siguiente codigo: " +
            Math.floor(100000 + Math.random() * 900000)
        );
    } else {
        res.send("El Usuario no se encuentra registrado");
    }
});

app.listen(3000, (req, res) => {
    console.log("El Servidor se ejecuta en el puerto 3000");
});