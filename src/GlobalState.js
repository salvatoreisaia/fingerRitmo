import React, { useState, useEffect } from 'react';
import Bowser from "bowser";
import CombinationsFromLevels from "./CombinationsFromLevels"
const GlobalStateContext = React.createContext([{}, () => { }]);
const browserInfo=Bowser.getParser(window.navigator.userAgent);

const GlobalStateProvider = (props) => {



  const [state, setState] = useState({
    navigation: "training",
    helpSound: "active",
    version: 0.5,//number!
    bpm: "60",
    metronomeType: "1/4",
    combinationIndex: 0,
    selectedLevels: [1],
    nerdModeLectures: { 1: [1], 2: [], 3: [], 4: [] },
    combinationsList: CombinationsFromLevels([1, 2, 3, 4], 5),
    pauseBetweenTrials: 2,
    sixteenthOfAnimation: 20,//20
    sixteenthOfBeginningExecution: 24,//24
    total16ths: 32,//32
    sixteenthCounter: -1,
    heandClass: "heandsWrapper",
    feedbackClass: "",
    isDrumActive: false,
    mode: "training",
    standardError: 0.1,//0.09,
    numberOfConfigurations: 5,
    currentOutcome: { outcome: [] }
  });

  const [didMountedState, setDidMountedState] = useState(false);
  useEffect(() => {

    if (didMountedState === true) {
      //console.log("global state update")
      localStorage.setItem("globalState", JSON.stringify(state));
    }
    if (didMountedState === false) {
      setDidMountedState(true)
    
      const savedGlobalState = JSON.parse(localStorage.getItem("globalState"))
      if (savedGlobalState !== null) {//controlla se salvata in localstorage una versione
        /*console.log("saved global storage not null")
        console.log("globalstate.version", state.version)
        console.log("savedglobalstate.version", savedGlobalState.version)*/
        if (savedGlobalState.version >= state.version) { //controlla se aggiornato
          console.log("global state caricato da local storage")
          savedGlobalState.currentOutcome= { outcome: [] }
          savedGlobalState.combinationIndex=0
          savedGlobalState.navigation= "training"
          setState(savedGlobalState)

        }
      }
    }

  }, [state])
  return (
    <GlobalStateContext.Provider value={[state, setState]}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}
window.sixteenthCounter = -1
window.combinationsList = CombinationsFromLevels([1, 2, 3, 4], 30);
export { GlobalStateContext, GlobalStateProvider };