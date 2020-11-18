import React, { useContext } from "react"
import { GlobalStateContext } from "./GlobalState"
import countToLed from './CountToLed'
import LedRestClassesFromProps from './LedRestClassesFromProps'


export default function Led(props) {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    
    var ledInfo=props.ledinfo[0].split(" ")
    var ledAtRestClasses=LedRestClassesFromProps(globalState.metronomeType)
    var ticCount=ledInfo[1]
    var lightedLed=countToLed(ticCount)
   
    var ledNumber=4
    
    
    var ledClasses=[];
    for (let index = 0; index < ledNumber; index++) {
        if (index===lightedLed){
            ledClasses[index]=ledAtRestClasses[index] +" "+props.ledinfo[0]
        } else{
            ledClasses[index]=ledAtRestClasses[index] 
        }
        
    }
   

    return (
        <div className={"ledContainer"}>
        <div  id="led0" className={ledClasses[0]}></div>
        <div  id="led1" className={ledClasses[1]}></div>
        <div  id="led2" className={ledClasses[2]}></div>
        <div  id="led3" className={ledClasses[3]}></div>
        </div>

    )
}

