export default function MomentOfAnimationFromMetrAndCounter(metronomeType,counter) {
    var tic;
    switch (metronomeType) {
        case "1/4":
          tic=counter
          break;
        case "1/8":
            tic=counter/2
          break;
        case "1/16":
            tic=counter/4
          break;
          default:
            console.error('metronome type unknow')
       
      }
      
    return tic
}

