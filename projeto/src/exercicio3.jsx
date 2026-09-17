import { useState, useEffect } from 'react'

async function atualizarUsuario(id, novosDados) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novosDados),
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return await resp.json()
}

function Exercicio3() {
  const [usuarios, setUsuarios] = useState([])
  const [editando, setEditando] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(dados => {
        setUsuarios(dados)
        setCarregando(false)
      })
      .catch(err => {
        console.error('Erro ao carregar:', err)
        setCarregando(false)
      })
  }, [])

  function iniciarEdicao(u) {
    setEditando(u)
    setNome(u.name || '')
    setEmail(u.email || '')
  }

  async function handleSalvar(e) {
    e.preventDefault()
    try {
      const atualizado = await atualizarUsuario(editando.id, { name: nome, email })
      setUsuarios(prev => prev.map(u => (u.id === editando.id ? { ...u, name: nome, email } : u)))
      setEditando(null)
      setNome('')
      setEmail('')
    } catch (err) {
      console.error('Erro ao salvar:', err)
    }
  }

  return (
    <div>
      <h2>Exercício 3 — Editar com PUT</h2>

      {carregando ? (
        <p>Carregando usuários...</p>
      ) : (
        <ul>
          {usuarios.map(u => (
            <li key={u.id} style={{ marginBottom: '8px' }}>
              {u.name} — {u.email}{' '}
              <button onClick={() => iniciarEdicao(u)}>Editar</button>
            </li>
          ))}
        </ul>
      )}

      {editando && (
        <form onSubmit={handleSalvar} style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Editando: {editando.name}</h3>
          <div style={{ marginBottom: '8px' }}>
            <label>Nome: </label>
            <input value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <label>Email: </label>
            <input value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditando(null)} style={{ marginLeft: '8px' }}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  )
}

export default Exercicio3