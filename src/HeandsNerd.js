import React, { useState, useContext } from 'react'
import fromSelectedLecturesToListOfLectures from './fromSelectedLecturesToListOfLectures'
import CombinationsFromPoolOfCombinations from './CombinationsFromPoolOfCombinations'
import { GlobalStateContext } from "./GlobalState"

export default function HeandsNerd(props) {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    function isSelectedStyle(index, level) {
        let css = {}
        if (props.get[level].indexOf(index) > -1) {
            css.opacity = "1"
        } else { css.opacity = "0.5" }

        return css
    }
    const [styleState, setStyleState] = useState(isSelectedStyle(props.index, props.level))
    const alt = "heand";
    var combinations = props.combination.split("-")
    var secondHeand
    if (props.combination.length > 4) {
        secondHeand = <img src={"/ritmo/mani/manisfondob/-" + combinations[1] + ".png"} alt={alt + " right"}></img>
    } else {
        secondHeand = <></>
    }
    var isNumberValue = (element) => {
        return typeof element === "number"
    }
    var clickHandle = () => {
        var selectedCombinations = props.get
        var heandsInNerdMode = 0;
        for (let i = 1; i <= 4; i++) {            
            heandsInNerdMode += selectedCombinations[i].length
        };

     


        var level = props.level

        if (selectedCombinations[level].indexOf(props.index) > -1) {
            console.log("già presente")
            if (heandsInNerdMode > 1) {//prevent no heands crash
                delete selectedCombinations[level][selectedCombinations[level].indexOf(props.index)]
                selectedCombinations[level]=selectedCombinations[level].filter(isNumberValue)
            }

        } else {
            selectedCombinations[props.level].push(props.index)


        }
        setStyleState(isSelectedStyle(props.index, props.level))

        props.set(selectedCombinations)
        console.log("selected lectures", selectedCombinations)
        var newCombinationsList = CombinationsFromPoolOfCombinations(
            fromSelectedLecturesToListOfLectures(selectedCombinations),
            globalState.numberOfConfigurations
        )

        setGlobalState({ ...globalState, combinationsList: newCombinationsList, selectedLevels: [5] })



    }




    return (



        <div className="heandsNerd" style={styleState} checked={true} onClick={clickHandle}>
            <img src={"/ritmo/mani/manisfondob/" + combinations[0] + ".png"} alt={alt + " left"}></img>
            {secondHeand}



        </div>



    )
}
