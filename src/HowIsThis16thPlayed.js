import countToLed from './CountToLed'

import ArrayToString from './ArrayToString'
export default function HowIsThisTicPlayed(ticCount,metronomeType,currentConfiguration ) {
    var playingInfo={}
    playingInfo.metronomeSound=IsThisTicPLayedWithMetronome(metronomeType,ticCount)
    playingInfo.isHelpSoundPlayed=IsHelpSoundPlayed(ticCount,currentConfiguration)
   
    
    
      
    return playingInfo
};
window.HowIsThisTicPlayed=HowIsThisTicPlayed

function IsThisTicPLayedWithMetronome(metronomeType,ticCount) {
    ticCount++
    var ledNumber=countToLed(ticCount)
    switch (metronomeType) {
        case "none":
            return "none"
            break;
        case "1/4":
            if(ledNumber===0){
                return "big"

            } else{
                return "none"
            }
          break;
        case "1/8":
            if(ledNumber===0){
                return "big"

            }else if(ledNumber===2){
                return "small"

            } else{
                return "none"
            }
          break;
        case "1/16":
            if(ledNumber===0){
                return "big"

            } else{
                return "small"
            }
          break;
          default:
            console.error("input data invalid")
       
      }
}
function IsHelpSoundPlayed(tic, currentConfigurationArray){
    var currentConfigurationString=ArrayToString(currentConfigurationArray)
    var ticCount=tic
    currentConfigurationString=currentConfigurationString.split("-").join("")
    var output

if (currentConfigurationString.length>4){
    ticCount+=8
    
    
    if(currentConfigurationString[ticCount%8]==="1"){
        output=true
    } else {
        output=false
    }
} else {
    ticCount+=4
    if(currentConfigurationString[ticCount%4]==="1"){
        output=true
    } else {
        output=false
    }

}

return output
}
window.HowIsThisTicPlayed=HowIsThisTicPlayed