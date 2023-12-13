import { Button, Dropdown } from "react-bootstrap";
import { useWindowSize } from "react-use";

type DifficultyLevelProps = {
    difficulty: string
    setDifficulty: (level: string) => void
    reset: ()=>void
}

const DifficultyLevel = ({difficulty, setDifficulty, reset }:DifficultyLevelProps) => {
    const {width} = useWindowSize();
    return ( 
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {width>1000? <>Difficulty: {difficulty}</>:<></>}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="text-center">
                <Dropdown.Item onClick={()=>setDifficulty("Easy")}>Easy</Dropdown.Item>
                <Dropdown.Item onClick={()=>setDifficulty("Intermediate")}>Intermediate</Dropdown.Item>
                <Dropdown.Item onClick={()=>setDifficulty("Hard")}>Hard</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                    <Button variant="secondary" onClick={reset}>New Word</Button>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
     );
}
 
export default DifficultyLevel;