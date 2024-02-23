export const createAudioContext = (desiredSampleRate) => {
  const { detect } = require('detect-browser');
  const browser = detect();

  var AudioCtor = (window as any).webkitAudioContext  ||  (window as any).AudioContext;

  desiredSampleRate = typeof desiredSampleRate === 'number'
      ? desiredSampleRate
      : 16000;
  var context = new AudioCtor({ sampleRate: desiredSampleRate });
  // Check if hack is necessary. Only occurs in iOS6+ devices
  // and only when you first boot the iPhone, or play a audio/video
  // with a different sample rate
  // console.log(browser);
  if (browser.name === "safari") {
      context = new AudioCtor();
  }

  console.log("Format: 1 channel pcm @ " + context.sampleRate/1000+"kHz");
  return context;
}

export const downSampleRate = async (blob, desiredSampleRate) => {
  return new Promise(async function(resolve, reject) {
    console.log(`downSampleRate`)
    var AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    let OfflineAudioContext = (window as any).OfflineAudioContext || (window as any).webkitOfflineAudioContext;
    var audioContext = new AudioContext();
    var arrayBuffer = await blob.arrayBuffer();
    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
      const offlineCtx = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.duration * desiredSampleRate, desiredSampleRate);
      const cloneBuffer = offlineCtx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
      // Copy the source data into the offline AudioBuffer
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
          // cloneBuffer.copyToChannel(audioBuffer.getChannelData(channel), channel);
          // cloneBuffer.getChannelData(channel)
          //         .set(audioBuffer.getChannelData(channel));
          var orgBuffering = audioBuffer.getChannelData(channel);
          var nowBuffering = cloneBuffer.getChannelData(channel);
          for (var i = 0; i < audioBuffer.length; i++) {
            nowBuffering[i] = orgBuffering[i];
          }
      }
      // Play it from the beginning.
      const source = offlineCtx.createBufferSource();
      source.buffer = cloneBuffer;
      source.connect(offlineCtx.destination);
      offlineCtx.oncomplete = function(e) {
        // `resampledAudioBuffer` contains an AudioBuffer resampled at 16000Hz.
        // use resampled.getChannelData(x) to get an Float32Array for channel x.
        const resampledAudioBuffer = e.renderedBuffer;
        // encode AudioBuffer to WAV
        var toWav = require('audiobuffer-to-wav');
        var wav = toWav(resampledAudioBuffer);
        let resultBlob = new Blob([wav], { type: "audio/wav" });
        resolve(resultBlob);
      }
      offlineCtx.startRendering();
      source.start(0);
    })
  });
};