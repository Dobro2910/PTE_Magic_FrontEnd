/**
 * Created by intelWorx on 27/10/2015.
 */
(function () {
  'use strict';

  console.log('MP3 conversion worker started.');
  importScripts('lame.min.js');

  var audioChannel = 2; // 1 : mono, 2: stereo
  var mp3Encoder, maxSamples = 1152, samplesMono, config, dataBuffer, samplesLeft, samplesRight;
  var clearBuffer = function () {
    dataBuffer = [];
  };

  var appendToBuffer = function (mp3Buf) {
    dataBuffer.push(new Int8Array(mp3Buf));
  };


  var init = function (prefConfig) {
    config = prefConfig || {debug: true};
    // 1: mono, 2: stereo
    mp3Encoder = new lamejs.Mp3Encoder(audioChannel, config.sampleRate || 44100, config.bitRate || 123);
    clearBuffer();
  };

  var floatTo16BitPCM = function floatTo16BitPCM(input, output) {
    //var offset = 0;
    for (var i = 0; i < input.length; i++) {
      var s = Math.max(-1, Math.min(1, input[i]));
      output[i] = (s < 0 ? s * 0x8000 : s * 0x7FFF);
    }
  };

  var convertBuffer = function(arrayBuffer){
    var data = new Float32Array(arrayBuffer);
    var out = new Int16Array(arrayBuffer.length);
    floatTo16BitPCM(data, out)
    return out;
  };

  var encode = function (arrayBuffer) {
    if (audioChannel === 1) {
      samplesMono = convertBuffer(arrayBuffer);
      var remaining = samplesMono.length;
      for (var i = 0; remaining >= 0; i += maxSamples) {
        var left = samplesMono.subarray(i, i + maxSamples);
        var mp3buf = mp3Encoder.encodeBuffer(left);
        appendToBuffer(mp3buf);
        remaining -= maxSamples;
      }
    } else {
      samplesLeft = convertBuffer(arrayBuffer);
      samplesRight = convertBuffer(arrayBuffer);
      var remaining = samplesLeft.length;
      for (var i = 0; remaining >= 0; i += maxSamples) {
        var leftChunk = samplesLeft.subarray(i, i + maxSamples);
        var rightChunk = samplesRight.subarray(i, i + maxSamples);
        var mp3buf = mp3Encoder.encodeBuffer(leftChunk, rightChunk);
        appendToBuffer(mp3buf);
        remaining -= maxSamples;
      }
    }
  };

  var finish = function () {
    appendToBuffer(mp3Encoder.flush());
    self.postMessage({
      cmd: 'end',
      buf: dataBuffer
    });
    if (config.debug) {
      console.log('Sending finished command');
    }
    clearBuffer(); //free up memory
  };

  self.onmessage = function (e) {
    switch (e.data.cmd) {
      case 'init':
        init(e.data.config);
        break;

      case 'encode':
        encode(e.data.buf);
        break;

      case 'finish':
        finish();
        break;
    }
  };

})();
