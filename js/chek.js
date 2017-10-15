(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Chek", [], factory);
	else if(typeof exports === 'object')
		exports["Chek"] = factory();
	else
		root["Chek"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var GameObjectSet = (function(){
  var GameObjectSet = function(){
    this.gameObjects = [];
  };

  GameObjectSet.prototype.add = function(gameObj){
    this.gameObjects.push(gameObj);
  };

  GameObjectSet.prototype.removeAt = function(idx){
    this.gameObjects.splice(idx, 1);
  };

  GameObjectSet.prototype.remove = function(obj){
    var idx = this.gameObjects.indexOf(obj);
    if(idx >= 0)
      this.gameObjects.splice(idx, 1);
  };

  GameObjectSet.prototype.at = function(idx){
    return this.gameObjects[idx];
  };

  GameObjectSet.prototype.indexOf = function(item){
    return this.gameObjects.indexOf(item);
  };

  GameObjectSet.prototype.size = function(){
    return this.gameObjects.lenght;
  };

  GameObjectSet.prototype.clear = function(){
    this.gameObjects = [];
  };

  GameObjectSet.prototype.map = function(func){
    for(var i = 0; i < this.gameObjects.length; i++){
      func(this.gameObjects[i], i);
    }
  };

  GameObjectSet.prototype.find = function(func){
    for(var i = 0; i < this.gameObjects.length; i++){
      if(func(this.gameObjects[i])){
        return this.gameObjects[i];
      }
    }

    return null;
  };

  GameObjectSet.prototype.update = function(dt){
    for(var i = 0; i < this.gameObjects.length; i++){
      this.gameObjects[i].update(dt);
    }
  };

  GameObjectSet.prototype.draw = function(){
    for(var i = 0; i < this.gameObjects.length; i++){
      this.gameObjects[i].draw();
    }
  };

  return GameObjectSet;
})();

module.exports = GameObjectSet;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var Transform = (function(){
  function Transform() {
      this.position = vec2.fromValues(0, 0);  // this is the translation
      this.scale = vec2.fromValues(1, 1);     // this is the width (x) and height (y)
      this.anchor = vec2.fromValues(0, 0);     // this is the width (x) and height (y)
      this.rotation = 0.0;               // in radians!
  }

  Transform.prototype.setPosition = function (xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };
  Transform.prototype.getPosition = function () { return this.position; };
  Transform.prototype.setAnchorPoint = function(x, y){ this.anchor[0] = x; this.anchor[1] = y;};
  Transform.prototype.getAnchorPoint = function(){return this.anchor;};
  Transform.prototype.getXPos = function () { return this.position[0]; };
  Transform.prototype.setXPos = function (xPos) { this.position[0] = xPos; };
  Transform.prototype.incXPosBy = function (delta) { this.position[0] += delta; };
  Transform.prototype.getYPos = function () { return this.position[1]; };
  Transform.prototype.setYPos = function (yPos) { this.position[1] = yPos; };
  Transform.prototype.incYPosBy = function (delta) { this.position[1] += delta; };

  Transform.prototype.setSize = function (width, height) {
      this.setWidth(width);
      this.setHeight(height);
  };
  Transform.prototype.getSize = function () { return this.scale; };
  Transform.prototype.incSizeBy = function (delta) {
      this.incWidthBy(delta);
      this.incHeightBy(delta);
  };
  Transform.prototype.getWidth = function () { return this.scale[0]; };
  Transform.prototype.setWidth = function (width) { this.scale[0] = width; };
  Transform.prototype.incWidthBy = function (delta) { this.scale[0] += delta; };
  Transform.prototype.getHeight = function () { return this.scale[1]; };
  Transform.prototype.setHeight = function (height) { this.scale[1] = height; };
  Transform.prototype.incHeightBy = function (delta) { this.scale[1] += delta; };

  Transform.prototype.setRotationInRad = function (rotationInRadians) {
      this.rotation = rotationInRadians;
      while (this.rotation > (2 * Math.PI)) {
          this.rotation -= (2 * Math.PI);
      }
  };
  Transform.prototype.setRotationInDegree = function (rotationInDegree) {
      this.setRotationInRad(rotationInDegree * Math.PI / 180.0);
  };
  Transform.prototype.incRotationByDegree = function (deltaDegree) {
      this.incRotationByRad(deltaDegree * Math.PI / 180.0);
  };
  Transform.prototype.incRotationByRad = function (deltaRad) {
      this.setRotationInRad(this.rotation + deltaRad);
  };
  Transform.prototype.getRotationInRad = function () {  return this.rotation; };
  Transform.prototype.getRotationInDegree = function () { return this.rotation * 180.0 / Math.PI; };

  Transform.prototype.getXform = function () {
      var matrix = mat3.create();

      // The matrices that WebGL uses are transposed, thus the typical matrix
      // operations must be in reverse.

      // Step A: compute translation, for now z is always at 0.0
      mat3.translate(matrix, matrix, vec2.fromValues(this.getXPos(), this.getYPos()));

      // translate to anchor point
      mat3.translate(matrix, matrix, vec2.fromValues(this.anchor[0], this.anchor[1]));

      // Step B: concatenate with rotation.
      mat3.rotate(matrix, matrix, this.getRotationInRad());

      // Step C: concatenate with scaling
      mat3.scale(matrix, matrix, vec2.fromValues(this.getWidth(), this.getHeight()));

      // after all transform translate back to root of coordinate system
      mat3.translate(matrix, matrix, vec2.fromValues(-this.anchor[0], -this.anchor[1]));
      mat3.transpose(matrix, matrix);
      return matrix;
  };

  return Transform;
})();

module.exports = Transform;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var gameLoop = __webpack_require__(3);
var core = __webpack_require__(4);
var event = __webpack_require__(5);
var gameObject = __webpack_require__(6);
var gameObjectSet = __webpack_require__(0);
var input = __webpack_require__(7);
var renderable = __webpack_require__(8);
var scene = __webpack_require__(9);
var transform = __webpack_require__(1);
var audio = __webpack_require__(10);
var resourceManager = __webpack_require__(11);

var Chek = core.merge({}, core, {
  GameLoop: gameLoop,
  Observable: event,
  GameObject: gameObject,
  GameObjectSet: gameObjectSet,
  Input: input,
  Renderable: renderable,
  Scene: scene,
  Transform: transform,
  Audio: audio,
  ResourceManager: resourceManager
});

module.exports = Chek;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var Input = __webpack_require__(7);

var GameLoop = (function(E){
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
      Input.update();

      // Step C: update the game the appropriate number of times.
      while(lagTime > MPF){
        this.update(MPF/1000);
        lagTime -= MPF;
      }

      // Step D: now let's draw
      this.draw(core.Core.getContext());

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
})();

module.exports =  GameLoop;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var E = E || {};
// initialize the variable while ensuring it is not redefined

E.Core = (function(E) {

  // drawing context
  var _ctx = null;
  var _canvas = null;

  var getCtx = function() {
    return _ctx;
  };

  var getCanvas = function() {
    return _canvas;
  };

  // initialize the WebGL, the vertex buffer and compile the shaders
  var initCtx = function(htmlCanvasID) {
    _canvas = document.getElementById(htmlCanvasID);
    _ctx = canvas.getContext("2d");

    if (_ctx === null) {
      document.write("<br><b>Canvas is not supported!</b>");
      return;
    }
  };

  var startScene = function(scene) {
    scene.loadScene.call(scene);
    E.GameLoop.start(scene);
  };

  // Clears the draw area and draws one square
  var clearCanvas = function() {
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
  };

  var inheritPrototype = function(subClass, superClass) {
    var prototype = Object.create(superClass.prototype);
    prototype.constructor = subClass;
    subClass.prototype = prototype;
  };

  return {
    getContext: getCtx,
    getCanvas: getCanvas,
    initContext: initCtx,
    clearCanvas: clearCanvas,
    inheritPrototype: inheritPrototype
  };
}(E));

var E = E || {};

E.merge = function(dest) {
  var sources = Array.prototype.slice.call(arguments, 1, arguments.length);

  for(var i = 0; i < sources.length; i++){
    for (var att in sources[i]) {
      if (sources[i].hasOwnProperty(att)) {
        dest[att] = sources[i][att];
      }
    }
  }

  return dest;
};

E.extend = function(aClass, methods) {
  aClass.prototype = E.merge(aClass.prototype, methods || {});
  return aClass;
};

E.inherit = function(subClass, superClass, subClassMethods) {
  var prototype = Object.create(superClass.prototype);
  prototype.constructor = subClass;
  subClass.prototype = E.merge(prototype, subClassMethods || {});
  return subClass;
};

E.EasingFunctions = {
  // no easing, no acceleration
  linear: function(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function(t) {
    return (--t) * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function(t) {
    return 1 - (--t) * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function(t) {
    return 1 + (--t) * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  }
};

module.exports = E;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var Observable = (function() {
  function Observable(obj) {
    if (obj) return mixin(obj);
  }


  function mixin(obj) {
    for (var key in Observable.prototype) {
      obj[key] = Observable.prototype[key];
    }
    return obj;
  }


  Observable.prototype.on = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
      .push(fn);
      return this;
    };


  Observable.prototype.once = function(event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };


  Observable.prototype.off = function(event, fn) {
      this._callbacks = this._callbacks || {};

      // all
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }

      // specific event
      var callbacks = this._callbacks['$' + event];
      if (!callbacks) return this;

      // remove all handlers
      if (1 == arguments.length) {
        delete this._callbacks['$' + event];
        return this;
      }

      // remove specific handler
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };


  Observable.prototype.trigger = function(event) {
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1);
    var callbacks = this._callbacks['$' + event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  Observable.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };


  Observable.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };

  return Observable;
})();

module.exports = Observable;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var GameObject = (function(){
  var GameObject = function(renderableObj){
    this.renderableComponent = renderableObj;
  };

  GameObject.prototype.update = function(dt){};
  GameObject.prototype.draw = function(){};
  GameObject.prototype.getRenderable = function(){ return this.renderableComponent;};
  GameObject.prototype.getXform = function(){return this.renderableComponent.getXform();};

  return GameObject;
})();

module.exports = GameObject;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var Input = (function(){
  var _components = [];

  function initialize(components, canvasId){
    if(typeof components != "object" || components.constructor != Array){
      components = ["Mouse"];
    }

    for(var i = 0; i < components.length; i++){
      if(Input.hasOwnProperty(components[i])){
        Input[components[i]].initialize(canvasId);
        _components.push(Input[components[i]]);
      }
    }
  }

  function update(){
    for(var i = 0; i < _components.length; i++){
      _components[i].update();
    }
  }

  function isClicked(){
    return  Input.Mouse.isButtonClicked(Input.Mouse.LeftButton) || Input.Touch.isTapped();
  }

  function getCursorPos(){
    return Input.Mouse.getCursorPos() || Input.Touch.getCursorPos();
  }

  return {
    initialize: initialize,
    update: update,
    isClicked: isClicked,
    getCursorPos: getCursorPos
  };
})();

Input.Keyboard = (function() {
  // Key code constants
  var Keys = {
    // arrows
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    // space bar
    Space: 32,
    // numbers
    Zero: 48,
    One: 49,
    Two: 50,
    Three: 51,
    Four: 52,
    Five: 53,
    Six: 54,
    Seven: 55,
    Eight: 56,
    Nine: 57,
    // Alphabets
    A: 65,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    R: 82,
    S: 83,
    W: 87,
    LastKeyCode: 222
  };

  var _previousKeyState = [],
    _isKeyPressed = [],
    _isKeyClicked = [];

  function _onKeyDown(e){
    _isKeyPressed[e.keyCode] = true;
  }

  function _onKeyUp(e){
    _isKeyPressed[e.keyCode] = false;
  }

  function initialize(){
    for(var i = 0; i <= Keys.LastKeyCode; i++){
        _previousKeyState[i] = false;
        _isKeyPressed[i] = false;
        _isKeyClicked[i] = false;
    }

    window.addEventListener("keydown", _onKeyDown);
    window.addEventListener("keyup", _onKeyUp);
  }

  function update(){
    for(var i = 0; i <= Keys.LastKeyCode; i++){
      _isKeyClicked[i] = (!_isKeyPressed[i]) && _previousKeyState[i];
      _previousKeyState[i] = _isKeyPressed[i];
    }
  }

  function isKeyPressed(key){
    return _isKeyPressed[key];
  }

  function isKeyClicked(key){
    return _isKeyClicked[key];
  }

  return {
    Keys: Keys,
    initialize: initialize,
    update: update,
    isKeyPressed: isKeyPressed,
    isKeyClicked: isKeyClicked
  };

})();


Input.Mouse = (function() {
  var mouseButtons = {
    Left: 0,
    Middle: 1,
    Right: 2
  };

  var _canvas = null,
      _previousButtonState = [false, false, false],
      _isButtonPressed = [false, false, false],
      _isButtonClicked = [false, false, false],
      _xPos = -1,
      _yPos = -1;

  function _onMouseDown(e){
    if(_getMousePos(e))
      _isButtonPressed[e.button] = true;
  }

  function _onMouseMove(e){
    return _getMousePos(e);
  }

  function _onMouseUp(e){
    _isButtonPressed[e.button] = false;
    _getMousePos(e);
  }

  function _getMousePos(e){
    var inside = false;
    var bBox = _canvas.getBoundingClientRect();

    // In Canvas Space now. Convert via ratio from canvas to client.
    var x = Math.round((e.clientX - bBox.left) *
        (_canvas.width / bBox.width));
    var y = Math.round((e.clientY - bBox.top) *
        (_canvas.width / bBox.width));
    if ((x >= 0) && (x < _canvas.width) && (y >= 0) &&
        (y < _canvas.height)) {
        _xPos = x;
        _yPos = y;
        inside = true;
    }

    // if inside, do not bubble up event
    return inside;
  }

  function initialize(canvasId){
    if(_canvas == null){
      _canvas = document.getElementById(canvasId);
      window.addEventListener("mousedown", _onMouseDown);
      window.addEventListener("mousemove", _onMouseMove);
      window.addEventListener("mouseup", _onMouseUp);
    }else{
      console.log("Should not reinitialize mouse handler");
    }
  }

  function update(){
    for(var i = 0; i < 3; i++){
      _isButtonClicked[i] = (!_isButtonPressed[i]) && _previousButtonState[i];
      _previousButtonState[i] = _isButtonPressed[i];
    }
  }

  function isButtonPressed(button){
    return _isButtonPressed[button];
  }

  function isButtonClicked(button){
    return _isButtonClicked[button];
  }

  function getCursorPos(){
    if(_xPos >= 0 && _yPos >= 0)
      return {x: _xPos, y: _yPos};
    else {
      return null;
    }
  }

  return {
    LeftButton: mouseButtons.Left,
    RightButton: mouseButtons.Right,
    MiddleButton: mouseButtons.Middle,
    initialize: initialize,
    update: update,
    isButtonClicked: isButtonClicked,
    isButtonPressed: isButtonPressed,
    getCursorPos: getCursorPos
  };

})();


Input.Touch = (function() {
  var _canvas = null,
      _previousState = false,
      _isPressed = false,
      _isTapped = false,
      _xPos = -1,
      _yPos = -1;

  function _onTouchStart(e){
    if(_getTouchPos(e))
      _isPressed = true;
  }

  function _onTouchMove(e){
    return _getTouchPos(e);
  }

  function _onTouchEnd(e){
    _isPressed = false;
    _getTouchPos(e);
  }

  function _getTouchPos(e){
    var inside = false;
    var bBox = _canvas.getBoundingClientRect();
    var touches = e.touches.length > 0 ? e.touches : e.changedTouches;
    var touchPoint = touches[0];

    // In Canvas Space now. Convert via ratio from canvas to client.
    var x = Math.round((touchPoint.clientX - bBox.left) *
        (_canvas.width / bBox.width));
    var y = Math.round((touchPoint.clientY - bBox.top) *
        (_canvas.width / bBox.width));
    if ((x >= 0) && (x < _canvas.width) && (y >= 0) &&
        (y < _canvas.height)) {
        _xPos = x;
        _yPos = y;
        inside = true;
    }

    // if inside, do not bubble up event
    return inside;
  }

  function initialize(canvasId){
    if(_canvas == null){
      _canvas = document.getElementById(canvasId);
      window.addEventListener("touchstart", _onTouchStart);
      window.addEventListener("touchmove", _onTouchMove);
      window.addEventListener("touchend", _onTouchEnd);
      window.addEventListener("touchcancel", _onTouchEnd);
    }else{
      console.log("Should not reinitialize touch handler");
    }
  }

  function update(){
    _isTapped = (!_isPressed) && _previousState;
    _previousState = _isPressed;
  }

  function isTouchHold(){
    return _isPressed;
  }

  function isTapped(){
    return _isTapped;
  }

  function getCursorPos(){
    if(_xPos >= 0 && _yPos >= 0)
      return {x: _xPos, y: _yPos};
    else {
      return null;
    }
  }

  return {
    initialize: initialize,
    update: update,
    isTouchHold: isTouchHold,
    isTapped: isTapped,
    getCursorPos: getCursorPos
  };
})();

module.exports = Input;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(1);
var Core = __webpack_require__(4);

var Renderable = (function(){
  function Renderable(shader) {
      // this.shader = shader;         // the shader for shading this object
      this.mXform = new Transform(); // transform that moves this object around
      this.color = "#000";    // color of pixel
  }


  Renderable.prototype.draw = function () {
    var ctx = Core.getContext();
    var form = this.mXform.getXform();
    ctx.setTransform(form[0], form[3], form[1], form[4], form[2], form[5]);
    ctx.fillStyle = this.color || "#000";
  };

  Renderable.prototype.getXform = function () { return this.mXform; };
  Renderable.prototype.setColor = function (color) { this.color = color; };
  Renderable.prototype.getColor = function () { return this.color; };

  return Renderable;
})();

module.exports = Renderable;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var GameObjectSet = __webpack_require__(0);

var Scene = (function(){
  function Scene(){
    this.gameObjects = new GameObjectSet();
  }
  Scene.prototype.initialize = function(){};
  Scene.prototype.loadScene = function(){};
  Scene.prototype.unloadScene = function(){};
  Scene.prototype.update = function(dt){
    this.gameObjects.map(function(obj){ obj.update(dt); });
  };
  Scene.prototype.draw = function(){
    this.gameObjects.map(function(obj){ obj.draw(); });
  };

  Scene.prototype.addObject = function(obj){
    this.gameObjects.add(obj);
  };

  Scene.prototype.removeObject = function(obj){
    this.gameObjects.remove(obj);
  };

  return Scene;
})();

module.exports = Scene;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var ResourceManager = __webpack_require__(11);

var Audio = (function() {

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
    if (!ResourceManager.isResourceLoaded(clipName)) {
      // Update resources in load counter.
      ResourceManager.asyncLoadResource(clipName, location);

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
            ResourceManager.asyncLoadCompleted(clipName, buffer);
          });
      };
      req.send();
    } else {
      ResourceManager.incAssetRefCount(clipName);
    }
  }

  function unloadAudio(clipName) {
    ResourceManager.unloadResource(clipName);
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
    var soundData = ResourceManager.getResouce(clipName);
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

    var soundData = ResourceManager.getResouce(name);
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
    var audioData = ResourceManager.getResouce(name);
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

})();

module.exports = Audio;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var ResourceManager = (function() {
  var _resourceMap = {},
    _loadingCount = 0,
    _totalLoad = 0,
    _loadCompletedCallback;

  var ResourceEntry = function(name, location) {
    this._asset = name;
    this._refCount = 0;
    this._location = location;
  };


  var setLoadCompletedCallback = function(callback) {
    _loadCompletedCallback = callback;
  };

  var checkForAllResourceLoaded = function() {
    if (_loadingCount == 0 && _loadCompletedCallback != null) {
      var func = _loadCompletedCallback;
      _loadCompletedCallback = null;
      func();
    }
  };

  var asyncLoadResource = function(name, location) {
    _resourceMap[name] = new ResourceEntry(name, location);
    _loadingCount++;
  };

  var asyncLoadCompleted = function(name, data) {
    if (!isResourceLoaded(name))
      alert("asyncLoadCompleted: [" + name + "] not in map!");
    var entry = _resourceMap[name] || {};
    entry._asset = data;
    entry._refCount++;
    _loadingCount--;
  };

  var isResourceLoaded = function(name) {
    return name in _resourceMap;
  };

  var retrieveResource = function(name) {
    var r = null;
    if (name in _resourceMap)
      r = _resourceMap[name]._asset;
    return r;
  };

  var unloadResource = function(name) {
    if (name in _resourceMap) {
      _resourceMap[name]._refCount++;
      if (_resourceMap[name]._refCount == 0) {
        delete _resourceMap[name];
      }
    }
  };

  function incAssetRefCount(name) {
    if (name in _resourceMap) {
      _resourceMap[name]._refCount++;
    }
  }

  return {
    setLoadCompletedCallback: setLoadCompletedCallback,
    checkForAllResourceLoaded: checkForAllResourceLoaded,
    asyncLoadResource: asyncLoadResource,
    asyncLoadCompleted: asyncLoadCompleted,
    isResourceLoaded: isResourceLoaded,
    getResouce: retrieveResource,
    unloadResource: unloadResource,
    incAssetRefCount: incAssetRefCount,
  };
})();

module.exports = ResourceManager;


/***/ })
/******/ ]);
});