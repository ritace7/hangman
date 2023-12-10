import '../styles/drawing.css';

const HEAD = (
    <div className="head"></div>
);

const BODY = (
    <div className="body"></div>
);

const RIGHT_ARM = (
    <div className="right-arm"></div>
);

const LEFT_ARM = (
    <div className="left-arm"></div>
);

const RIGHT_LEG = (
    <div className="right-leg"></div>
);

const LEFT_LEG = (
    <div className="left-leg"></div>
);

//array of all the body parts
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
    numberOfGuesses: number
}

//the hangman drawing and the gallow
const HangmanDrawing = ({ numberOfGuesses}: HangmanDrawingProps) => {
    return (  
        <div className="hanger">
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div className="noose"></div>   
            <div className="top-bar"></div>
            <div className="middle-pole"></div>
            <div className="bottom-bar"></div>
        </div>
    );
}
 
export default HangmanDrawing;