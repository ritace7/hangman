import { useCallback, useEffect, useState } from 'react';
import Confetti  from 'react-confetti';
import useWindowSize from "react-use/lib/useWindowSize";
import words from './wordList.json';
import Header from './components/Header';
import DifficultyLevel from './components/DifficultyLevel';
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmandWord';
import Keyboard from './components/Keyboard';
import Footer from './components/Footer';
import GameStatus from './components/GameStatus';

import './styles/App.css';
import './styles/responsive.css';

interface WordDictionary {
  [key: string]: string[];
}

function App() {
  //difficulty level
  const [difficulty, setDifficulty] = useState("Easy");
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const wordsArray: WordDictionary = words;

  useEffect(()=>{
    setWordToGuess(wordsArray[difficulty][Math.floor(Math.random() * wordsArray[difficulty].length)])    
    setGuessedLetters([]);
  },[difficulty])
  
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));
  const isLoser = incorrectLetters.length >= 6; //6 body parts

  //add the guessed letter to the array
  const addGuessedLetter = useCallback((letter: string) => {

  //   //if already guessed, return
    if(guessedLetters.includes(letter) || isLoser|| isWinner) return
  
  //   //if not guessed, add to list
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  //handle key press
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

  //     //if not an alphabet, return
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
      setWordToGuess(wordsArray[difficulty][Math.floor(Math.random() * wordsArray[difficulty].length)])
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  const { width, height } = useWindowSize();
  
  return (
    <div className="App">
      {isWinner && <GameStatus status={"You're a Winner!"} />}
      <div className="confetti-overlay">
        {isWinner && <Confetti width={width} height={height} tweenDuration={1000}/>}
      </div>
      {isLoser && <GameStatus status={"Tough Luck!"}/>}

      <Header/>
      
      <span className="dropdown">
        <DifficultyLevel 
            difficulty={difficulty} 
            setDifficulty={setDifficulty}
        />
      </span>


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
      <Footer/>
    </div>
  )
}

export default App
