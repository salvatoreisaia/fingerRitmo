import countToLed from './CountToLed'

export default function CounterAndMetrToSound(counter,metrType) {
    const ledN=countToLed(counter+1)
    var soundType=0;

    switch (metrType) {
        case "1/4":
          soundType=0
          break;
        case "1/8":
            soundType= ledN===0 || ledN===2?0:1;
          break;
        case "1/16":
            soundType=ledN===0?0:1;
          break;
          default:
            soundType=0;
       
      }
    
    return soundType
}

