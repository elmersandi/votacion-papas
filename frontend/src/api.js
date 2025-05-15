export async function fetchCandidates() {
  const response = await fetch('http://localhost:5000/api/candidates');
  if (!response.ok) throw new Error('Error al obtener candidatos');
  return response.json();
}
