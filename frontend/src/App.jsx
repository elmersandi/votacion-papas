import { useState, useEffect } from 'react';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/candidates');
      const data = await res.json();
      setCandidates(data);
      checkWinner(data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  };

  const checkWinner = (candidatesList) => {
    const foundWinner = candidatesList.find(c => c.votes >= 10);
    if (foundWinner) {
      setWinner(foundWinner);
    } else {
      setWinner(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return alert('Por favor, completa ambos campos');

    try {
      const res = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      if (res.ok) {
        const newCandidate = await res.json();
        const updatedList = [...candidates, newCandidate];
        setCandidates(updatedList);
        checkWinner(updatedList);
        setName('');
        setDescription('');
      } else {
        alert('Error al guardar el candidato');
      }
    } catch (err) {
      alert('Error de conexión al servidor');
      console.error(err);
    }
  };

  const handleVote = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/candidates/${id}/vote`, {
        method: 'POST',
      });

      if (res.ok) {
        const updatedCandidate = await res.json();
        const updatedList = candidates
          .map(c => (c._id === updatedCandidate._id ? updatedCandidate : c))
          .sort((a, b) => b.votes - a.votes);

        setCandidates(updatedList);
        checkWinner(updatedList);
      } else {
        alert('Error al votar');
      }
    } catch (err) {
      alert('Error de conexión al servidor');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Votación de Papas Católicos</h1>

      {winner && (
        <div style={{ marginBottom: 20, padding: 10, backgroundColor: '#d4edda', color: '#155724', borderRadius: 5 }}>
          🎉 ¡El ganador es <strong>{winner.name}</strong> con {winner.votes} votos! 🎉
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Nombre del Papa"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Descripción del Papa"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit">Agregar Papa</button>
      </form>

      <ul>
        {candidates.map(c => (
          <li key={c._id} style={{ marginBottom: 10 }}>
            <strong>{c.name}</strong>: {c.description} — Votos: {c.votes || 0}{' '}
            <button onClick={() => handleVote(c._id)}>Votar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
