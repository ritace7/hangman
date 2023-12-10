import '../styles/keyboard.css';

// array of all the alphabets
const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string []
    addGuessedLetter: (letter:string) => void
    disabled?: boolean
}

//keyboard component
const Keyboard = ({activeLetters, inactiveLetters, addGuessedLetter, disabled=false}: KeyboardProps) => {
    return (  
        <div className="keyboard">
            {KEYS.map((key) => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return (
                    <button 
                        key={key} 
                        className={`key ${isActive?'active':''} ${isInactive?'inactive':''}`}
                        onClick={()=> addGuessedLetter(key)}
                        disabled={isInactive || isActive || disabled}
                    >{key}</button>
            )})}
        </div>
    );
}
 
export default Keyboard;