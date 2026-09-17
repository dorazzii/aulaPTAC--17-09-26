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

async function excluirUsuario(id) {
  const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return true
}

export default function Exercicio5() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [editando, setEditando] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function carregar() {
      try {
        setCarregando(true)
        const resp = await fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const dados = await resp.json()
        setUsuarios(dados)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    carregar()
    return () => controller.abort()
  }, [])

  function iniciarEdicao(u) {
    setEditando(u)
    setNome(u.name)
    setEmail(u.email)
  }

  function limparFormulario() {
    setEditando(null)
    setNome('')
    setEmail('')
  }

  async function handleSalvar(e) {
    e.preventDefault()
    setErro(null)

    try {
      if (editando) {
        const atualizado = await atualizarUsuario(editando.id, { name: nome, email })
        setUsuarios(prev => prev.map(u => u.id === editando.id ? atualizado : u))
      } else {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nome, email }),
        })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const novo = await resp.json()
        setUsuarios(prev => [...prev, novo])
      }
      limparFormulario()
    } catch (e) {
      setErro(e.message)
    }
  }

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
      <h2>Exercício 5 — Mini-CRUD Completa</h2>
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}

      <form onSubmit={handleSalvar}>
        <h3>{editando ? 'Editar Usuário' : 'Novo Usuário'}</h3>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Salvar</button>
        {editando && <button type="button" onClick={limparFormulario}>Cancelar</button>}
      </form>

      {carregando && <p>Carregando...</p>}

      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.name} - {u.email}
            <button onClick={() => iniciarEdicao(u)}>Editar</button>
            <button onClick={() => tentarExcluir(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}