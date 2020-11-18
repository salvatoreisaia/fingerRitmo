export default function IntervalCalculatorFromBpmAndMetronome(bpm,metronomeType) {
    var interval;
    switch (metronomeType) {
        case "1/4":
          interval=60/bpm
          break;
        case "1/8":
          interval=30/bpm
          break;
        case "1/16":
            interval=60/4/bpm
          break;
          default:
            interval=60/bpm
       
      }
    return interval
}

