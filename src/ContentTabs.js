import React, { useContext, useEffect } from 'react'
import Trainer from './Trainer'
import Options from './Options'
import Stats from './Stats'
import { GlobalStateContext } from "./GlobalState"

export default function ContentTabs() {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);
  var navigation = globalState.navigation;
  /*var savedGlobalState = JSON.parse(localStorage.getItem("globalState"))
  if (savedGlobalState !== null) {//controlla se salvata in localstorage una versione
    console.log("saved global storage not null")
    console.log("globalstate.version", globalState.version)
    console.log("savedglobalstate.version", savedGlobalState.version)
    if (savedGlobalState.version >= globalState.version) { //controlla se aggiornato
      console.log("global state caricato da local storage")
      setGlobalState(savedGlobalState)
    }}*/
    
    var content
    switch (navigation) {

      case "stats":
        content = <Stats />
        break;
      case "options":
        content = <Options />
        break;
      default:
        content = <></>
    }
    return (
      <div className="tabContainer" key={"ra123324"}>

        <Trainer />
        {content}



      </div>
    )
  }
