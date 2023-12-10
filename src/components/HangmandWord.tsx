import '../styles/word.css';

type HangmanWordProps = {
    reveal?: boolean
    guessedLetters: string[]
    wordToGuess: string
}

//the word to guess
const HangmanWord = ({guessedLetters, wordToGuess, reveal=false}: HangmanWordProps) => {
    return (  
        <div className="hangman-word">
            {wordToGuess.split("").map((letter, index)=>(
                <span className="letter" key={index}>
                    <span className={`${guessedLetters.includes(letter)|| reveal?"visible":"hidden"} ${!guessedLetters.includes(letter) && reveal?"lost":"won"}`}>
                         {letter}
                    </span>                
                </span>
            ))}
        </div>
    );
}
 
export default HangmanWord;