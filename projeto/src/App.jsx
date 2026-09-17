import { useState } from 'react'
import Exercicio1 from './exercicio1'
import Exercicio2 from './exercicio2'
import Exercicio3 from './exercicio3'
import Exercicio4 from './exercicio4'
import Exercicio5 from './exercicio5'

export default function App() {
  const [exercicioAtual, setExercicioAtual] = useState(1)

  return (
    <div>
      <h1>Exercícios - Aula 06</h1>

      <nav>
        <button onClick={() => setExercicioAtual(1)}>Exercício 1</button>
        <button onClick={() => setExercicioAtual(2)}>Exercício 2</button>
        <button onClick={() => setExercicioAtual(3)}>Exercício 3</button>
        <button onClick={() => setExercicioAtual(4)}>Exercício 4</button>
        <button onClick={() => setExercicioAtual(5)}>Exercício 5</button>
      </nav>

      <hr />

      {exercicioAtual === 1 && <Exercicio1 />}
      {exercicioAtual === 2 && <Exercicio2 />}
      {exercicioAtual === 3 && <Exercicio3 />}
      {exercicioAtual === 4 && <Exercicio4 />}
      {exercicioAtual === 5 && <Exercicio5 />}
    </div>
  )
}