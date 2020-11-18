import React from 'react'
import ArrayToString from "./ArrayToString"

export default function HeandShow(props) {
    const alt="heand";
    var numericString=ArrayToString(props.combination)
   
    numericString=numericString.replace(/0/g,"_")
    numericString=numericString.replace(/1/g,"I")
    
    var combinations=numericString.split("-")
    var secondHeand
    if(numericString.length>4){
        secondHeand=<img  src={"/ritmo/mani/manisfondob/-"+combinations[1]+".png"} alt={alt+" right"}></img>
    } else{
        secondHeand=<></>
    }
    
    
    
    return (

        <div className="heandShow">
            
            <div className={props.heandsClass} id="heandsWrapper">
                <img  src={"/ritmo/mani/manisfondob/"+combinations[0]+".png"} alt={alt+" left"}></img>
                {secondHeand}
                
                

            </div>
         
            
        </div>
    )
}
