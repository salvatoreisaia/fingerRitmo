import React, { useContext,useState } from 'react'
import uuidv4 from 'uuid/v4'
import { GlobalStateContext } from "./GlobalState"
import moment from 'moment'
import StarRatings from 'react-star-ratings';
window.moment=moment
export default function ContentTabs() {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);
    console.log(Object.keys(window.localStorage).sort())
    var statsKeys = Object.keys(window.localStorage).sort().reverse()
    const[stats,setStats]=useState(statsKeys.map((key, index) => {
        if (key!=="globalState") {
            var data = JSON.parse(window.localStorage.getItem(key.toString()))
        var numberOfCorrect = 0
        for (let index = 0; index < data.outcome.length; index++) {
            const element = data.outcome[index];
            if (element.isCorrect) { numberOfCorrect++ }
        }
        var d=new Date(0);d.setUTCSeconds(key)
        var date=moment(d).format('DD/MM/YYYY')
        var time=moment(d).format('hh:mm:ss')
        var su=data.outcome.length!==0?data.outcome.length:1
        var stars=numberOfCorrect/su*5
        stars= typeof stars==="number"?stars:0
        console.log(data)

        return <div key={uuidv4()} className="statsItem">
            <div>
    <div>{date}</div>
    <div>{time}</div>
            
             
             </div><div>Corrette:{numberOfCorrect + "/" + su}</div><StarRatings
  rating={stars}
  starDimension='20px'
  name='rating'
  starSpacing="0px"
  starRatedColor="#f7b02f"

/></div>
    
            
        }        
        })

    )
    function cleanStats(){
        var chacheState=localStorage.getItem("globalState")
        localStorage.clear()
        if(chacheState!=null){
            localStorage.setItem("globalState",chacheState)
        }
        
        setStats(<></>)
    }
    
    
   
    return (
        <>
        <button onClick={cleanStats}>Cancella statistiche</button>
        <div key={"ra123324"} className={"statsTable"}>
            {stats}

        </div></>
    )
}
