const mysql = require ("mysql2");
//Creamos la conexion a la base de datos//
const db = mysql.createConnection(
    {
        host: "201.124.162.192", //DIRECCION IP QUE CAMBIA
        user: "maik", //SUS NOMBRES DE USUARIO QUE LES ASIGNE
        password: "maik", //SU PASSWORD
        user: "ulises", //SUS NOMBRES DE USUARIO QUE LES ASIGNE
        password: "ulises", //SU PASSWORD
        user: "fredy", //SUS NOMBRES DE USUARIO QUE LES ASIGNE
        password: "fredy", //SU PASSWORD
        database: "learnmatch" ,//learnmatch //
        port: 3306
    }
);
//Verificamos que si se haga conexion a la base de datos  eimprima en consola el valor //
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión establecida con éxito a la base de datos');
});

module.exports = db;