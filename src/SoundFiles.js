

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

export default SoundFiles;