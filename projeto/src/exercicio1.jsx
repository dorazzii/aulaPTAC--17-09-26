import { useState, useEffect } from 'react'

async function excluirUsuario(id) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return true
}

export default function Exercicio1() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(dados => setUsuarios(dados))
  }, [])

  async function handleExcluir(id) {
    await excluirUsuario(id)
    setUsuarios(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div>
      <h2>Exercício 1 — Excluir Simples</h2>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => handleExcluir(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}