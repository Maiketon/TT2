const express = require('express');
const router = express.Router();
const controlEmparejamiento = require('../controladores/controlZegoCloud');

//Se genera el token del emparejamiento//
//POST//
router.post('/hacerTokenSala', controlEmparejamiento.hacertoken);

