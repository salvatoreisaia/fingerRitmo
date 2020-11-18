export default function MomentOfAnimationFromMetrAndCounter(metronomeType,interval) {
    var quarterDuration;
    switch (metronomeType) {
        case "1/4":
          quarterDuration=interval
          break;
        case "1/8":
            quarterDuration=interval*2
          break;
        case "1/16":
            quarterDuration=interval*4
          break;
          default:
            console.error('metronome type unknow')
       
      }
      
    return quarterDuration
}

