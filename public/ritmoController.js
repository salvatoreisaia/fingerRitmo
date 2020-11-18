var ritmoController = {
    metronome(){ console.log("mount a metronome first") },
    ledCOunter: 0,
    ticIntervalInSec: 1.0,
    activateAnimation: () => {
        setTimeout(() => {
            heandsWrapper.classList.add("heandsAnimation")
        }, 0)
    },
    forEveryUpdate () {
       
        if (this.metronome.isActive === true) {
            var b = (this.now() - this.metronome.listOfTimes[this.metronome.ticCounter - 1])
            b = 1 - (b % 1)
            b = b < .02 ? this.ticIntervalInSec : b
            b = b < .7 ? 0 : b
            var c = b.toFixed(2)
            
            this.globalElement.style.setProperty('--ledBrightness', c);
        }
    },
    mount () {
        this.metronome = new Metronomo(() => { });

        this.globalElement = document.documentElement;

    },
    now() {
        return this.metronome.audioContext.currentTime
    },
    metronomeStart() {
        if (this.metronome.isActive === false) {
            this.metronome.attivaMetronomo(this.ticIntervalInSec)
            heandsWrapper = document.getElementById("heandsWrapper")
            window.requestAnimationFrame(ledLoop)


        }
    },
    metronomeStop(){
        metronome.fermaMetronomo();
        ledCounter = 0;
        document.getElementById("heandsWrapper").classList.remove("heandsAnimation")
        document.documentElement.style.setProperty('--ledBrightness', 0)
        

    },
    

}


function ledLoop () {
    ritmoController.forEveryUpdate()
    
        window.requestAnimationFrame(ledLoop)
    
}
//window.requestAnimationFrame(ledLoop)
