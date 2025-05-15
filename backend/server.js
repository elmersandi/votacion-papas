require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/votaciondb';

mongoose.connect(uri)
  .then(() => console.log('✅ Conectado a MongoDB local'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const candidatesRouter = require('./routes/candidates');
app.use('/api/candidates', candidatesRouter);
