require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/votaciondb';

const candidates = [
  { name: 'Papa Francisco', description: 'Actual papa desde 2013' },
  { name: 'Papa Benedicto XVI', description: 'Papa emérito, renunció en 2013' },
  { name: 'Papa Juan Pablo II', description: 'Papa de 1978 a 2005' },
  { name: 'Papa Juan XXIII', description: 'Inició el Concilio Vaticano II' },
  { name: 'Papa Pío XII', description: 'Papa durante la Segunda Guerra Mundial' }
];

mongoose.connect(uri)
  .then(async () => {
    console.log('Conectado a MongoDB, insertando candidatos papales...');
    await Candidate.deleteMany(); // limpia colección
    await Candidate.insertMany(candidates);
    console.log('Candidatos insertados correctamente');
    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));
