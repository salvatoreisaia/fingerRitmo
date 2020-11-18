import React, { useContext, useState, useRef, useEffect } from "react"
import { GlobalStateContext } from "./GlobalState"
import uuidv4 from 'uuid/v4'
import CombinationsFromLevels from './CombinationsFromLevels'
import Checkbox from '@material-ui/core/Checkbox';
import NerdMode from "./NerdMode";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import fromSelectedLecturesToListOfLectures from './fromSelectedLecturesToListOfLectures'
import CombinationsFromPoolOfCombinations from './CombinationsFromPoolOfCombinations'


export default function Options(props) {
 //   console.log("options component updated")
    
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    var checkedLevels = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    }
    function levelsDetection(value) {
        checkedLevels[value] = true
    }
    
    
    

    const [levelsState, setLevelsState] = useState(checkedLevels);
    const [nerdModeState, setNerdModeState] = useState(false);
    const [didMountedState, setDidMountedState] = useState(false);
    const [numberOfCombinationsState, setNumberOfCombinationsState] = useState(globalState.numberOfConfigurations);
    const typesOfMetronome = ["1/4", "1/8", "1/16", "none"]
    const levels = [1, 2, 3, 4, 5]
    const fourthsBeforeAnimation = ["4/8", "8/8", "12/8", "16/8"]

    

    function helpSoundOptionRender() {
        if (globalState.helpSound === "active") {
            return <>
                <input key={uuidv4()} type="radio" id="active" defaultChecked name="helpSound" value="active" />
                <label key={uuidv4()} htmlFor="active">Attivo</label>
                <input key={uuidv4()} type="radio" id="unactive" name="helpSound" value="unactive" />
                <label key={uuidv4()} htmlFor="unactive">Non attivo</label></>

        } else if (globalState.helpSound === "unactive") {
            return <>
                <input key={uuidv4()} type="radio" id="active" name="helpSound" value="active" />
                <label key={uuidv4()} htmlFor="active">Attivo</label>
                <input key={uuidv4()} type="radio" id="unactive" defaultChecked name="helpSound" value="unactive" />
                <label key={uuidv4()} htmlFor="unactive">Non attivo</label></>

        }
    }

    function handleChange(event) {
        if (event.target.name != "standardError" || (event.target.name === "standardError" && event.target.value >= 0)) {
            var newState = { ...globalState }
            newState[event.target.name] = event.target.value
            setGlobalState(newState);
            setGlobalState(newState);
            console.log(parseFloat(newState.standardError) + 0)
        }

    }

    function handleChangeFBA(e) {

        var newGlobalState = globalState
        var eighths = e.target.value.split("/")[0]
        eighths = parseInt(eighths)
        console.log(eighths)
        var sixteenth = ((eighths - 2) * 2)

        newGlobalState = {
            ...newGlobalState,
            sixteenthOfAnimation: sixteenth,
            sixteenthOfBeginningExecution: sixteenth + 4,
            total16ths: sixteenth + 12
        }
        setGlobalState(newGlobalState)
        console.log(newGlobalState)

    }
    const inputNumberOfCombinationRef = useRef();
    useEffect(() => {

        if (didMountedState === true) {
            inputNumberOfCombinationRef.current.focus();
        }
        if (didMountedState === false) {
            setDidMountedState(true)
        }

    }, [numberOfCombinationsState])
    useEffect(() => {
        
        //update selected levels on component update
    if(globalState.selectedLevels.indexOf(5)!==-1){
        setLevelsState(
            {
                1: false,
                2: false,
                3: false,
                4: false,
                5: true
            }

        )
    }else{
        globalState.selectedLevels.forEach(levelsDetection);
        setLevelsState(checkedLevels)
        
    }
    
    },[globalState])
    function handleNumberOfCombinationsChange(event) {
        setNumberOfCombinationsState(parseInt(event.target.value))




    }
    function handleNumberOfCombinationsSave() {

        var newState = { ...globalState }
        var value = numberOfCombinationsState
        var newCombinationsList
        if (value > 0) {
        }
        else {
            console.error("valore non valido")
            value = 1;
            setNumberOfCombinationsState(value)
        }
        newState["numberOfConfigurations"] = value
        if(newState.selectedLevels.length===0){
            console.error("non puoi salvare le letture se non hai selezionato livelli")
            alert("non puoi salvare le letture se non hai selezionato livelli")
            return 0
        } else if(newState.selectedLevels.indexOf(5)!==-1){
            console.log("è livello nerd")
            newCombinationsList=CombinationsFromPoolOfCombinations( 
                fromSelectedLecturesToListOfLectures(newState.nerdModeLectures),
                globalState.numberOfConfigurations
                )
        } else{
            console.log("non è livello nerd")
            newCombinationsList= CombinationsFromLevels(globalState.selectedLevels, newState["numberOfConfigurations"])
        

        }
        newState["combinationsList"]=newCombinationsList
         setGlobalState(newState);
        console.log("number of combinations saved")

    }

    function handleLevelsChange(event) {
        let newLevelsState = { ...levelsState, [event.target.value]: event.target.checked }
        //console.log(newLevelsState)
        let checkedCheckboxesArray = []
        for (const key in newLevelsState) {

            if (newLevelsState[key]) { checkedCheckboxesArray.push(parseInt(key)) }
        }
        console.log(checkedCheckboxesArray)
        var newState = { ...globalState }
        if (event.target.value === "5" && event.target.checked === true) {
            console.log("l'evento è nerd mode")
            newState["selectedLevels"] = [5]
            // console.log(newState)

            var newCombinationsList = CombinationsFromPoolOfCombinations(
                fromSelectedLecturesToListOfLectures(newState.nerdModeLectures),
                newState.numberOfConfigurations
            )
            console.log(
                newCombinationsList
            )
            setGlobalState({ ...newState, combinationsList: newCombinationsList })
            return -1
        } else {
            console.log("l'evento non è nerd mode")
            var indexOf5 = checkedCheckboxesArray.indexOf(5)
            if( indexOf5!==-1){checkedCheckboxesArray.splice(indexOf5, 1)}
            
            newLevelsState[5] = false
        }
        
        

       // console.log("handle level change")



        let numberOfCombinations = newState["numberOfConfigurations"]
        if (checkedCheckboxesArray.length > 0 && checkedCheckboxesArray.indexOf(5) === -1) {
            newState["combinationsList"] = CombinationsFromLevels(checkedCheckboxesArray, numberOfCombinations)
        }
        newState["selectedLevels"] = checkedCheckboxesArray
        // console.log(newState)
        setGlobalState(newState);

    }
    var numberOfCombinationsMessage = numberOfCombinationsState != globalState.numberOfConfigurations ? "Impostazione non salvata" : ""
    var numberOfCombinationsError = numberOfCombinationsState < 1 ? " Valore non valido, vergognati!" : ""
    var saveButtonStyle = {}
    //console.log(Number.isInteger(numberOfCombinationsState))
    if (numberOfCombinationsState < 1 || !Number.isInteger(numberOfCombinationsState)) {
        numberOfCombinationsError = " Valore non valido, vergognati!"
        saveButtonStyle.display = "none"

    }
    var optionStyle = {}
    var nerdModeStyle = { display: "none" }
    if (nerdModeState) {
        optionStyle = { display: "none" }
        nerdModeStyle = {}

    }

    return (
        <>
            <div className="nerdModeSwitch">
                <label id="normalModeLabel">Normal Mode</label>
                <FormControlLabel
                    control={<Switch checked={nerdModeState} onChange={() => { var switchState = nerdModeState ? false : true; setNerdModeState(switchState) }} />}
                    label="Nerd Mode"
                />
            </div>
            <NerdMode style={nerdModeStyle}></NerdMode>
            <div className={"options"} style={optionStyle} key={uuidv4()}>

                <div className={"typeOfMetronome"} key={uuidv4()} onChange={handleChange}>
                    <p>Tipo di metronomo:</p>
                    {typesOfMetronome.map((typeOfMetronome, index) => {
                        var metronomeRadioInput
                        if (typeOfMetronome === globalState.metronomeType) {
                            metronomeRadioInput = <><input key={uuidv4()} id={typeOfMetronome} defaultChecked type="radio" name="metronomeType" value={typeOfMetronome} />
                                <label htmlFor={typeOfMetronome} key={uuidv4()}>{typeOfMetronome}</label></>
                        } else {
                            metronomeRadioInput = <><input key={uuidv4()} id={typeOfMetronome} type="radio" name="metronomeType" value={typeOfMetronome} />
                                <label htmlFor={typeOfMetronome} key={uuidv4()} >{typeOfMetronome}</label></>
                        }

                        return metronomeRadioInput
                    })}

                </div>
                <div className={"bpm"} key={uuidv4()}>
                    <label key={uuidv4()} htmlFor="bpmRange">{"bpm: " + globalState.bpm}</label>
                    <input key={uuidv4()} type="range" min="1" max="250" value={globalState.bpm} name="bpm" className={"slider"} id="bpmRange" onChange={handleChange} />
                </div>
                <div className={"helpSound"} key={uuidv4()} onChange={handleChange}>
                    <p>Suono d'aiuto:</p>
                    {helpSoundOptionRender()}

                </div>
                <div className={"Levels"}>
                    <p>Livelli:</p>


                    {levels.map((level, index) => {
                        var levelsCheckbox
                        var levelString = level.toString();
                        var levelLabel = level === 5 ? "Nerd Mode" : levelString;
                        var checked = levelsState[level]
                        levelsCheckbox = <>
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleLevelsChange} name="Levels" value={levelString} />}
                                label={levelLabel}
                            /></>


                        return levelsCheckbox
                    })}


                </div>
                <div>
                    <label key={uuidv4()} htmlFor="numberOfConfigurations">Letture per prova:</label>
                    <input key={uuidv4()} type="number" ref={inputNumberOfCombinationRef} id="numberOfConfigurations" onInput={(e) => { handleNumberOfCombinationsChange(e); console.log(e) }} name="numberOfConfigurations" min="1" value={numberOfCombinationsState} onChange={()=>{}}/>
                    <span id="numberOfConfigurationsMessage" style={{ color: "gray", fontSize: "0.6rem" }} >{numberOfCombinationsMessage}</span>
                    <span id="numberOfConfigurationsError" style={{ color: "red", fontSize: "0.6rem" }} >{numberOfCombinationsError}</span>
                    <button key={uuidv4()} style={saveButtonStyle} id="numberOfConfigurationsSave" onClick={handleNumberOfCombinationsSave}>Salva</button>
                </div>
                <div className={"fourthsBeforeAnimation"} key={uuidv4()} onChange={handleChangeFBA}>
                    <p>Ottavo dell'animazione:</p>
                    {fourthsBeforeAnimation.map((fourthBeforeAnimation, index) => {
                        var FBARadioInput
                        if (fourthBeforeAnimation.split("/")[0] == (globalState.sixteenthOfAnimation / 2) + 2) {

                            FBARadioInput = <><input key={uuidv4()} id={fourthBeforeAnimation} defaultChecked type="radio" name="fourthsBeforeAnimation" value={fourthBeforeAnimation} />
                                <label key={uuidv4()} htmlFor={fourthBeforeAnimation} >{fourthBeforeAnimation}</label></>
                        } else {
                            FBARadioInput = <><input key={uuidv4()} id={fourthBeforeAnimation} type="radio" name="fourthsBeforeAnimation" value={fourthBeforeAnimation} />
                                <label key={uuidv4()} htmlFor={fourthBeforeAnimation} >{fourthBeforeAnimation}</label></>
                        }

                        return FBARadioInput
                    })}

                </div>
                <div key={uuidv4()} className={"standardErrorOption"}>
                    <label key={uuidv4()} htmlFor="standardError">Errore standard in secondi:</label>
                    <input onChange={handleChange} key={uuidv4()} type="number" id="standardError" name="standardError" min="0.00001" max="0.3" step="0.00001" value={globalState.standardError} />
                </div>

            </div></>

    );

}


