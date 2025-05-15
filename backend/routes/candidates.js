const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Obtener candidatos ordenados por votos (descendente)
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener candidatos' });
  }
});

// Agregar nuevo candidato
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const newCandidate = new Candidate({ name, description });
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar candidato' });
  }
});

// Votar por un candidato (aumentar votos en 1)
router.post('/:id/vote', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidato no encontrado' });

    candidate.votes += 1;
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Error al votar' });
  }
});

module.exports = router;
