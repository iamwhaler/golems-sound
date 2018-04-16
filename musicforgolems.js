$(document).ready(function() {

    let sourceNode = null;
    const SAMPLE_LIBRARY = {
        'Ambient': {
                speed: 1,
                octave: 4,
                file: './ambient-sound/night.mp3'

            },

        'Battle': {
                speed: 1,
                octave: 4,
                file: './ambient-sound/day.mp3'
            },
        
        'Structure': {
            text: 'structure integrity compromised',
        }
    };

    let audioContext = new AudioContext();


    let gainNode = audioContext.createGain();
 //   let source = audioContext.createMediaStreamSource(stream);
  //  source.connect(gainNode);
    gainNode.gain.value = 0.4;
    gainNode.connect(audioContext.destination);

    let playSound = function (environment) {

        let file = SAMPLE_LIBRARY[environment].file;

        fetch(file)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {

                AudioBufferSourceNode.playbackRate
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
            for(i=1; i>10; i++) {
                setTimeout( () => function() {})
            }
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

            })
            .catch(e => console.error(e));
    };

    let stopSound = function (environment) {

            sourceNode.stop();
            sourceNode = null;

    };

    $('#trigger').click(function () {
        loopSound('Ambient')
    });

    $('#trigger-n').click(() => loopSound('Battle'));

    $('#stopSound').click(() => stopSound('Ambient'));

});