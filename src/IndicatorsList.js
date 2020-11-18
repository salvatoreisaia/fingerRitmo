import React, { useContext } from 'react';
import { GlobalStateContext } from "./GlobalState"
import Indicator from './Indicator'
import uuidv4 from 'uuid/v4'


export default function ContentTab(props) {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    var combinations = props.combinationsList;
    
    /*se outcome.lenght >0 scorri tutta la lista e se drumactive è true || 
    mode && index<di lenght è training colora altrimenti grigio */
    function backgroundStyle(id) {
        if (id < globalState.currentOutcome.outcome.length && globalState.currentOutcome.outcome[id]!==undefined) {
            if (globalState.currentOutcome.outcome[id].isDrumActive || globalState.mode === "test") {
                const color = globalState.currentOutcome.outcome[id].isCorrect ? "green" : "red"
                return { backgroundColor: color }
            } else {
                return { backgroundColor: "lightgray" }
            }
        } else {
            return { backgroundColor: "lightgray" }
        }
    }

    return (
        <div className='indicatorsListContainer'>
            {combinations.map((combination, index) => {

                return <Indicator id={index} key={uuidv4()} backgroundStyle={backgroundStyle(index)} combination={combination} />
            })}

        </div>
    )
}

/* mock combination data */
