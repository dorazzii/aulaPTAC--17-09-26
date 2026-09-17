import { useState, useEffect } from 'react'

async function excluirUsuario(id) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return true
}

export default function Exercicio4() {
  const [usuarios, setUsuarios] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(dados => setUsuarios(dados))
  }, [])

  async function tentarExcluir(id) {
    setErro(null)
    const prev = usuarios
    setUsuarios(prev.filter(u => u.id !== id))

    try {
      await excluirUsuario(id)
    } catch (e) {
      setUsuarios(prev)
      setErro(e.message)
    }
  }

  return (
    <div>
      <h2>Exercício 4 — Rollback com try/catch</h2>
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => tentarExcluir(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}