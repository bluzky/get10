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

E.merge = function(dest, src) {
  for (var att in src) {
    if (src.hasOwnProperty(att)) {
      dest[att] = src[att];
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
