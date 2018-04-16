$(document).ready(function() {

    let sourceNode = null;
    const SAMPLE_LIBRARY = {
        'Ambient': {
                speed: 1,
                octave: 4,
                playing: 0,
                file: './Samples/Cello/cello-a2.wav'

            },

        'Battle': {
                speed: 1,
                octave: 4,
                playing: 0,
                file: './ambient-sound/day.mp3'
            },
        
        'Structure': {
            text: 'structure integrity compromised'
        }
    };

    let audioContext = new AudioContext();


    let playSound = function (environment) {

        let file = SAMPLE_LIBRARY[environment].file;

        fetch(file)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {

                sourceNode = audioContext.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.loop = false;
                sourceNode.connect(audioContext.destination);
                sourceNode.start();
                SAMPLE_LIBRARY[environment].playing = 1;
            })
            .catch(e => console.error(e));
    };

    let loopSound = function (environment) {

        let file = SAMPLE_LIBRARY[environment].file;

        if(sourceNode!=null){
            sourceNode.stop();
            sourceNode = null;
        }

        fetch(file)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {

                sourceNode = audioContext.createBufferSource();
                sourceNode.buffer = audioBuffer;
                sourceNode.loop = true;
                sourceNode.connect(audioContext.destination);
                sourceNode.start();
                SAMPLE_LIBRARY[environment].playing = 1;

            })
            .catch(e => console.error(e));
    };

    let stopSound = function (environment) {
        let playingSound = SAMPLE_LIBRARY[environment].playing;
        if (playingSound = 1) {
            sourceNode.stop()
            sourceNode = null;
        }
    };

    $('#trigger').click(function () {
        playSound('Ambient')
    });

    $('#trigger-n').click(() => loopSound('Battle'));

    $('#stopSound').click(() => stopSound('Ambient'));

});