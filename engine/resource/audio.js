var E = E || {};
E.Audio = (function(E) {

  var _soundEnabled = true,
      _volume = 1,
      _audioContext,
      _bgAudioNode;

  function initAudioContext(){
    try {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      _audioContext = new AudioContext();
    } catch (e) {
      alert("Web Audio Is not supported.");
    }
  }

  function loadAudio(clipName, location) {
    if (!E.ResourceManager.isResourceLoaded(clipName)) {
      // Update resources in load counter.
      E.ResourceManager.asyncLoadResource(clipName, location);

      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if ((req.readyState === 4) && (req.status !== 200)) {
          alert(clipName + ": loading failed! [Hint: you cannot double click index.html to runthis project." +
            "The index.html file must be loaded by a web-server.]");
        }
      };
      req.open('GET', location, true);
      req.responseType = 'arraybuffer';
      req.onload = function() {
        _audioContext.decodeAudioData(req.response,
          function(buffer) {
            E.ResourceManager.asyncLoadCompleted(clipName, buffer);
          });
      };
      req.send();
    } else {
      E.ResourceManager.incAssetRefCount(clipName);
    }
  }

  function unloadAudio(clipName) {
    E.ResourceManager.unloadResource(clipName);
  }

  /*
  options:
  {
    volume: 0.1, // 0 - 1
    duration:  // in second
  }
  */
  function playOnce (clipName, options) {
    options = options || {};
    var soundData = E.ResourceManager.getResouce(clipName);
    if (soundData !== null) {
      var sourceNode = _audioContext.createBufferSource(),
          gainNode = _audioContext.createGain();

      sourceNode.buffer = soundData;
      sourceNode.connect(gainNode);
      gainNode.connect(_audioContext.destination);

      if(options.volume != null && options.volume >=0 && options.volume <= 1){
        gainNode.gain.value = volume;
      }

      if(options.duration){
        sourceNode.loop = true;
        sourceNode.start(0, 0, options.duration);
      }else{
        sourceNode.start(0);
      }
    }
  }

  function playRepeat(name, time, padding){
    time = Math.max(time, 1);
    padding = padding || 0;

    var soundData = E.ResourceManager.getResouce(name);
    _repeat(name, time, (soundData.duration + padding)*1000);
  }

  function _repeat(name, repeatTime, duration, count){
    count = count || 0;
    count++;

    playOnce(name);
    if(count < repeatTime){
      setTimeout(_repeat.bind(this, name, repeatTime, duration, count), duration);
    }
  }

  function playBackgroundAudio(name){
    var audioData = E.ResourceManager.getResouce(name);
    if(_soundEnabled && audioData != null){
      stopBackgroundAudio();
      var gainNode = _audioContext.createGain();
      _bgAudioNode = _audioContext.createBufferSource();
      _bgAudioNode.buffer = audioData;
      _bgAudioNode.connect(gainNode);
      gainNode.connect(_audioContext.destination);
      _bgAudioNode.loop = true;
      _bgAudioNode.start();
      gainNode.gain.value = _volume;
    }
  }

  function stopBackgroundAudio(){
    if(_bgAudioNode != null){
      _bgAudioNode.stop();
      _bgAudioNode = null;
    }
  }

  function hasBackgroundAudio(){
    return _bgAudioNode != null;
  }

  // define export method
  var exports = {
    init: initAudioContext,
    load: loadAudio,
    unload: unloadAudio,
    play: playOnce,
    playRepeat: playRepeat,
    playBackgroundAudio: playBackgroundAudio,
    stopBackgroundAudio: stopBackgroundAudio,
    hasBackgroundAudio: hasBackgroundAudio
  };

  return exports;

})(E);
