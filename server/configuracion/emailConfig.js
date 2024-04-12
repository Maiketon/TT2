const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // Servidor SMTP de Outlook
    port: 587, // Puerto estándar para SMTP sobre TLS
    secure: false, // True para 465, false para otros puertos
    auth: {
        user: 'learnmatch2024029@hotmail.com', // CORREO ELECTRONICO DEL SISTEMA
        pass: 'Esmegma123' // CONTRASEÑA DEL SISTEMA
    },
    tls: {
        ciphers:'SSLv3' // Asegura compatibilidad si hay problemas de TLS
    }
});


module.exports = transporter;