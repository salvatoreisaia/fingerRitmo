import React, { useContext, useRef, useEffect } from 'react';
import { GlobalStateContext } from "./GlobalState"
import uuidv4 from 'uuid/v4';

export default function Indicator(combination) {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    let style = {}
    let progressBarStyle = {}
    let indicatorRef = useRef(null)

    var scroll = () => {

        if (combination.id === globalState.combinationIndex) {
            var currentY = window.pageYOffset
            indicatorRef.current.scrollIntoView()
            window.scrollTo(0, currentY)

        }
    }

    useEffect(scroll)
    if (combination.id === globalState.combinationIndex) {



        style = { backgroundColor: "black" }
        progressBarStyle = {
            width: "var(--progress)",
            borderRight: "2px solid orange",
            height: "3px",
            transform: "scaleY(10)",
            transformOrigin: "0% 110%"

        }

    }
    function selectThisLecture() {
        if (globalState.mode === "training") {
            if (window.m.runningState === "active") {
                window.m.pausaMetronomo()
            }
            setTimeout(() => {
                setGlobalState({ ...globalState, combinationIndex: combination.id })
                window.m.sixteenthCounter = 0;
            }, 100)


        }
    }

    function combinationCharacterToClass(character) {
        if (character === "0") {
            return "down"
        } else if (character === "1") {

            return "up"

        } else if (character === "-") {
            return "space"

        }

    }
    return (
        <div>
            <div className="indicatorContainer" ref={indicatorRef} onClick={selectThisLecture} id={"indicator" + combination.id} style={combination.backgroundStyle} >

                {
                    combination.combination.map(char => {
                        return (<div key={uuidv4()} style={style} className={"finger " + combinationCharacterToClass(char)}></div>)
                    }

                    )
                }



            </div>
            <div className={"progressBar"} style={progressBarStyle}></div>
        </div>

    )
}
/*
for (var i=0; i < 9;i++){
    return (<div className={"finger " + combinationCharacterToClass(combination[i])}></div>)

}
*/