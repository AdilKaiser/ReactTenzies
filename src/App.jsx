import { useEffect, useState } from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value:Math.ceil(Math.random() * 6),
      isHeld:false,
      id:nanoid()
    }
  }
    
  function allNewDice() {

      const newDice = []

      for(let i=0; i<10; i++) {
          newDice.push(generateNewDie())
      }

      return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die: generateNewDie()
      }))
    }
    else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const dieElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <div className="d-flex justify-content-center">
      <div className="container bg-white d-flex align-items-center justify-content-center">
        <div className="container-inner bg-darkblue">
          <div className="container-content bg-gray">
            <div className="heading">
              <h1 className="text-darkblue">Tenzies</h1>
            </div>
            <div className="description">
              <p className="text-navyblue">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
              </p>
            </div>
            <div className="numbersgrid-div">
              {dieElements}
            </div>
            <div className="button-div">
              <button className="bg-blue text-white" onClick={rollDice}>{tenzies ? "Play Again" : "Roll"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
