class Metronomo {
    constructor(callBackatEveryTic) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.callBackatEveryTic = callBackatEveryTic;
        this.soundFiles = new SoundFiles(this.audioContext, ["media/plam.mp3"]);
        this._ticCounter = 0
        this.totaleQuarti = 8
        this.quarterForAnimation = 4;
        this.contatorePallino = 0
        this.listOfTimes = []
        this.isActive = false
        this.animationFunction = () => { console.log("heands animation")};

    }
    set ticCounter(x) {
        this._ticCounter = x
        setTimeout(()=>{
            if (this.quarterForAnimation === x) { this.animationFunction() }

        },0) 


    }
    get ticCounter(){
        return this._ticCounter
    }



    suonaProssimoSuono(quando, intervallo) {

        if (this.isActive === true) {
            var ticSource = this.audioContext.createBufferSource();
            ticSource.buffer = this.soundFiles.buffers[0]
            ticSource.connect(this.audioContext.destination)
            ticSource.start(quando)
            this.ticCounter++
            this.listOfTimes.push(this.nextSound);
            this.nextSound = this.audioContext.currentTime

            if (this.isActive === true) {

                ticSource.onended = () => {


                    this.suonaProssimoSuono(quando + intervallo, intervallo)

                    this.callBackatEveryTic()



                }
            }
        }

    }
    fermaMetronomo() {
        this.isActive = false
        this.ticCounter = 0
        this.listOfTimes=[]


    }
    attivaMetronomo(intervallo) {

        this.isActive = true;
        this.intervallo = intervallo
        this.nextSound = this.audioContext.currentTime
        this.suonaProssimoSuono(this.nextSound + intervallo, intervallo)

    }






}

class SoundFiles {
    constructor(context, urlList) {
        this.buffers = [];
        var self = this;

        urlList.forEach((url, index) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
            xhr.onload = () => context.decodeAudioData(xhr.response,
                (buffer) => self.buffers[index] = buffer,
                (error) => console.error('decodeAudioData error', error));
            xhr.open("GET", url);
            xhr.send();
        });
    }
}
