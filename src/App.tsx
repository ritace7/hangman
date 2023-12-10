import { useCallback, useEffect, useState } from 'react';
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmandWord';
import Keyboard from './components/Keyboard';

import words from './wordList.json';
import './styles/App.css';

function App() {
  //get a random word from the json file
  function getWord(){
    return words[Math.floor(Math.random() * words.length)]
  }
  
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));
  const isLoser = incorrectLetters.length >= 6; //6 body parts

  //add the guessed letter to the array
  const addGuessedLetter = useCallback((letter: string) => {

    //if already guessed, return
    if(guessedLetters.includes(letter) || isLoser|| isWinner) return
  
    //if not guessed, add to list
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  //handle key press
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      //if not an alphabet, return
      if(!key.match(/^[a-z]$/)) return

      e.preventDefault();
      addGuessedLetter(key);
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  //handle enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      //if not enter, return
      if(key !== "Enter") return
      
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
    <div className="App">
      <div className="game-status">
        {isWinner && "You have won! - Refresh to try again"}
        {isLoser && "Bad luck! - Refresh to have another go"}
      </div>
      <HangmanDrawing 
        numberOfGuesses = {incorrectLetters.length}
      />
      <HangmanWord 
        reveal={isLoser}
        guessedLetters = {guessedLetters}
        wordToGuess = {wordToGuess}
      />
      <Keyboard 
        activeLetters = {guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters= {incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        disabled = {isWinner || isLoser}
      />
    </div>
  )
}

export default App
