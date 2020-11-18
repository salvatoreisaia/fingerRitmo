import React, { useState, useContext } from 'react'
import IndicatorsList from './IndicatorsList'
import HeandShow from './HeandShow'
import Buttons from './Buttons'
import Led from './Led'
import Options from './Options'

import { GlobalStateContext } from "./GlobalState"


export default function Trainer() {
    
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    
    const [ledSettings,setLedSettings]= useState("led");
    const [heandsClass, setHeandsClass] = useState({ heandClass: "heandsWrapper"})
    var navigation=globalState.navigation;
    var trainerStyle={display:"none"}
    if(navigation==="test" || navigation==="training"){
        trainerStyle={display:"flex"}

    }
    
    return (
        <div className="trainer" style={trainerStyle}>
            <div className="infoLed">
                <div className="bpmIndicator">{globalState.bpm+" bpm"}</div>
                <Led ledinfo={[ledSettings,setLedSettings]}/>
                
                
            </div>


            <HeandShow ledSettings={ledSettings.ledSettings} heandsClass={globalState.heandClass+" "+globalState["feedbackClass"]} combination={globalState.combinationsList[globalState.combinationIndex]} />
            <IndicatorsList combinationsList={globalState.combinationsList} />
            <Buttons ledController={[ledSettings,setLedSettings]} heandController={[heandsClass, setHeandsClass]} />
            
            
        </div>
    )
}

