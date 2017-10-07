var E = E || {};

E.GameLoop = (function(E){
  var FPS = 60;
  var MPF = 1000/FPS;
  var previousTime,
      lagTime = 0,
      currentTime,
      elapsedTime = 0,
      isRunning = false,
      game = null,
      state = "paused"; // pause || running || stop

  var _runLoop = function(){
    if(state == "running"){
      requestAnimationFrame(function(){
        // Step A: set up for next call to _runLoop and update input!
        _runLoop.call(game);
      });

      // Step B: compute elapsed time since last RunLoop was executed
      currentTime = Date.now();
      elapsedTime = currentTime - previousTime;
      previousTime = currentTime;
      lagTime += elapsedTime;

      // update input
      E.Input.update();

      // Step C: update the game the appropriate number of times.
      while(lagTime > MPF){
        this.update(MPF/1000);
        lagTime -= MPF;
      }

      // Step D: now let's draw
      this.draw(E.Core.getContext());

    }else if(state == "stop"){
      game.unloadScene();
    }
  };

  var _startLoop = function(){
    previousTime = Date.now();
    state = "running";
    requestAnimationFrame(function(){
      _runLoop.call(game);
    });
  };

  var start = function(newGame){
    game = newGame;
    game.initialize();
    _startLoop();
  };

  var stop = function(){
    state = "stop";
  };

  var pause = function(){
    state = "paused";
  };

  var resume = function(){
    if(state == "paused"){
      state = "running";
      requestAnimationFrame(function(){
        _runLoop.call(game);
      });
    }
  };

  return {
    start: start,
    stop: stop,
    pause: pause,
    resume: resume
  };
})(E);
