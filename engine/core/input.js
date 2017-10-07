var E = E || {};

E.Input = (function(E){
  var _components = [];

  function initialize(components, canvasId){
    if(typeof components != "object" || components.constructor != Array){
      components = ["Mouse"];
    }

    for(var i = 0; i < components.length; i++){
      if(E.Input.hasOwnProperty(components[i])){
        E.Input[components[i]].initialize(canvasId);
        _components.push(E.Input[components[i]]);
      }
    }
  }

  function update(){
    for(var i = 0; i < _components.length; i++){
      _components[i].update();
    }
  }

  function isClicked(){
    return  E.Input.Mouse.isButtonClicked(E.Input.Mouse.LeftButton) || E.Input.Touch.isTapped();
  }

  function getCursorPos(){
    return E.Input.Mouse.getCursorPos() || E.Input.Touch.getCursorPos();
  }

  return {
    initialize: initialize,
    update: update,
    isClicked: isClicked,
    getCursorPos: getCursorPos
  };
})(E);

E.Input.Keyboard = (function(E) {
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

})(E);


E.Input.Mouse = (function(E) {
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

})(E);


E.Input.Touch = (function(E) {
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
})(E);
