export default function LedRestClassesFromProps(metronomeType) {
    var ledRestClassesArray=[];
    switch (metronomeType) {
        case "1/4":
          ledRestClassesArray=["led ledBig","led ledBig","led ledBig","led ledBig"]
          break;
        case "1/8":
          ledRestClassesArray=["led ledBig","led ledSmall"," led ledBig","led ledSmall"]
          break;
        case "1/16":
            ledRestClassesArray=[" led ledBig","led ledSmall","led ledSmall","led ledSmall"]
          break;
          default:
            ledRestClassesArray=[" led ledBig"," led ledBig"," led ledBig"," led ledBig"]
       
      }
    return ledRestClassesArray
}

