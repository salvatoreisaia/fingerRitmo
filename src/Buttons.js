import React, { useContext, useState, useEffect } from 'react'
import Metronome from "./Metronome"
import { GlobalStateContext } from "./GlobalState"


export default function Buttons(props) {
    
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    const [state, setState] = useState("Stop")
    useEffect(() => {
        switch (state) {
            case "Play":
                
                break;
            case "Stop":
                
                break;
            default:
                
                break;
        }
    });

    return (
        <div className="buttonsWrapper" >
            <Metronome props={props} 
            bpm={globalState.bpm} 
            totalQuarts={7}
            setGlobalState={setGlobalState} 
            globalState={globalState} 
            metronomeType={globalState.metronomeType}
            combinationIndex={globalState.combinationIndex}
            currentConfiguration={globalState.combinationsList[globalState.combinationIndex]}
            />
            </div>
    )
}
//❚❚
/*
<div onClick={() => setState("Play")} className="button"><span aria-hidden="true" role="img">▶</span></div>
            <div  onClick={() => setState("Stop")} className="button"><span aria-hidden="true" role="img">■</span></div>

<button onClick={props.controlMethods.printState} className="button"><span aria-hidden="true" role="img">⏮</span></button>
           <button className="button"><span aria-hidden="true" role="img">⏪</span></button>
 <button className="button"><span aria-hidden="true" role="img">⏩</span></button>
           <button className="button"><span aria-hidden="true" role="img">⏭</span></button>
*/