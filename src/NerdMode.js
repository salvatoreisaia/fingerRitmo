import React, { useContext,useState} from "react"
import { GlobalStateContext } from "./GlobalState"
import HeandsNerd from "./HeandsNerd"
import Levels from "./Levels"
import uuidv4 from 'uuid/v4'


export default function NerdMode(props) {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    const [selectedConfigurations, setSelectedConfigurations] = useState(globalState.nerdModeLectures);
    /*
    usa get e set per impostare lo state e il global state insieme
    */
  

   //console.log("nerdmodeupdate")
    function levelNerdMode(numberOfLevel) {
        var output=<details >
        <summary>Livello {numberOfLevel}</summary>
        <div>
        {Levels(numberOfLevel).map((configuration, index) => {
                    var listOfConfigurationsInNerdMode=<HeandsNerd index={index}  level={numberOfLevel} key={uuidv4()} set={ setSelectedConfigurations} get={selectedConfigurations} combination={configuration}></HeandsNerd>

                    

                    return listOfConfigurationsInNerdMode

                })}</div>
           
        </details>
        return output
        
    }
  /* style={{display:"none"}} */
        return (
        <div className={"nerdMode"} style={props.style}>
            

        {levelNerdMode(1)}
        {levelNerdMode(2)}
        {levelNerdMode(3)}
        {levelNerdMode(4)}

       
        </div>

    )
}

