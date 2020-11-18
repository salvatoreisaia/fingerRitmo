export default function ListOfPlayedTics(totalQuarts,metronomeType,currentConfiguration ) {
    var listOfPlayedTics
    
    switch (metronomeType) {
        case "1/4":
          quart=ticCount
          break;
        case "1/8":
          quart=ticCount/2
          break;
        case "1/16":
            quart=ticCount/4
          break;
          default:
            console.error("metronome type not found")
       
      }
      
    return listOfPlayedTics
}

