
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Usa tu servicio de correo electrónico
    auth: {
        user: 'tt2024a029@gmail.com', // Tu dirección de correo electrónico
        pass: 'Esmegma123' // Tu contraseña de correo electrónico
    }
});

module.exports = transporter;
