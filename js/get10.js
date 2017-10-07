var Get10 = Get10 || {};
E.merge(Get10, {
  randomChoice: function(choices) {
    choices = choices || [];
    var idx = Math.floor((Math.random() * choices.length));
    return choices[idx];
  }
});

Get10.cfg = {
  colors: ['#fabe55', '#9cde59', '#fe7757', '#57bffb', '#f79014', '#0b7173', '#9b3b2e', '#2168B2', '#3ECC96', '#4D1868'],
  animation: {
    moveDuration: 0.4,
    destroyDuration: 0.2
  },
  font: "48px serif",
  state: {
    initial: 'menu',
    events: [{
        name: 'play',
        from: 'menu',
        to: 'in_game'
      },
      {
        name: 'win',
        from: 'in_game',
        to: 'result'
      },
      {
        name: 'loose',
        from: 'in_game',
        to: 'result'
      },
      {
        name: 'play',
        from: 'result',
        to: 'in_game'
      },
      {
        name: 'quit',
        from: 'result',
        to: 'menu'
      },
    ]
  },

  runner: {
    start: true
  },
  board: {
    width: 5,
    height: 5,
    cellWidth: 80,
  },
  audio: {
    CLICK: "./sounds/click.wav",
    START: "./sounds/start.wav",
    HIT: "./sounds/hit.wav",
    END: "./sounds/end.wav"
  }
};

Get10.Manager = (function(Get10, E){
  var Manager = function(){
    StateMachine.create(Get10.cfg.state, this);
    this.initMenu();
    this.storage = this.initStorage();
    E.Core.initContext("canvas");
    E.Input.initialize(["Mouse", "Touch"], "canvas");
    this.scene = new Get10.Game(this);
    this.addEvents();
  };
  Manager.prototype.initStorage = function() {
    try {
      return this.storage || window.localStorage || {};
    } catch (e) {
      return {};
    }
  };

  Manager.prototype.initMenu = function() {
    var self = this;
    var startMenu = new Get10.Menu("start-screen", {
      "click .js-btn-play": this.play.bind(this),
      "click .js-btn-help": function() {
        self.menuManager.show("help");
      }
    });

    var endMenu = new Get10.Menu("win-screen", {
      "click .js-btn-replay": this.play.bind(this),
      "click .js-btn-quit": this.quit.bind(this),
      "click .js-btn-share": this.share.bind(this)
    });

    var help = new Get10.Menu("help-screen", {
      "click .js-btn-ok": function() {
        self.menuManager.show("startmenu");
      }
    });

    this.menuManager = new Get10.MenuManager();
    this.menuManager.addMenu("startmenu", startMenu);
    this.menuManager.addMenu("endmenu", endMenu);
    this.menuManager.addMenu("help", help);
  };

  Manager.prototype.onplay = function() {
    this.menuManager.hideAll();
    this.scene.reset();
    E.GameLoop.start(this.scene);
    this.resize();
  };

  Manager.prototype.onloose = function() {
    E.GameLoop.stop();
    this.saveHighScore();
    this.menuManager.get("endmenu").findFirst(".js-score").innerHTML = this.scene.score.score;
    this.menuManager.get("endmenu").findFirst(".js-loose").style.display = "block";
    this.menuManager.get("endmenu").findFirst(".js-win").style.display = "none";
    this.menuManager.show("endmenu");
    E.Audio.play("END");
  };

  Manager.prototype.onwin = function() {
    E.GameLoop.stop();
    this.saveHighScore();
    this.menuManager.get("endmenu").findFirst(".js-score").innerHTML = this.scene.score.score;
    this.menuManager.get("endmenu").findFirst(".js-loose").style.display = "none";
    this.menuManager.get("endmenu").findFirst(".js-win").style.display = "block";
    this.menuManager.show("endmenu");
    E.Audio.play("END");
  };

  Manager.prototype.onquit = function() {
    this.menuManager.show("startmenu");
  };

  Manager.prototype.saveHighScore = function() {
    var topScore = this.getTopScore();

    if (topScore < this.scene.score.score) {
      this.setTopScore(this.scene.score.score);
    }
  };

  Manager.prototype.getTopScore = function() {
    return this.storage.topScore || 0;
  };

  Manager.prototype.setTopScore = function(score) {
    this.storage.topScore = score;
  };

  Manager.prototype.share = function() {
    // do something to share on fb
  };

  E.extend(Manager, {
    addEvents: function() {
      window.addEventListener("resize", this.onresize.bind(this));
      var game = this.scene;

      if (game.onfocus) {
        document.body.tabIndex = toInt(document.body.tabIndex, 0); // body needs tabIndex to recieve focus
        document.body.addEventListener('focus', function(ev) {
          game.onfocus(ev);
        });
      }

      // if (game.onclick) {
      //   var self = this;
      //   E.Core.getCanvas()
      //         .addEventListener('click', function(ev) {
      //           var mousePos = self.getMousePos(self.canvas, ev);
      //           game.onclick(mousePos);
      //         });
      // }
    },

    getMousePos: function(canvas, e) {
    var rect = E.Core.getCanvas().getBoundingClientRect();
      var pos = {x: 0, y: 0};
      if(e.offsetX) {
        pos.x = e.offsetX;
        pos.y = e.offsetY;
      }
      else if(e.layerX) {
        pos.x = e.layerX;
        pos.y = e.layerY;
      }
      return pos;
    },

    onresize: function() {
      if (this.onresizeTimer)
        clearTimeout(this.onresizeTimer);
      this.onresizeTimer = setTimeout(this.onresizeend.bind(this), 50); // dont fire resize event until 50ms after user has stopped resizing (avoid flickering)
    },

    onresizeend: function() {
      this.resize();
    },

    resize: function() {
      console.log("Resize canvas");
      if(window.innerWidth <= 420 || window.innerHeight<= 420){
        var vertexSize = Math.min(window.innerWidth, window.innerHeight) - 20;
        var ratio = vertexSize/400;
        E.Core.getCanvas().style.transform = "scale("+ ratio + ")";

        var container = document.getElementById("canvas-wrapper");
        container.style.width = vertexSize+ "px";
        container.style.height = vertexSize + "px";
      }
    }
  });

  return Manager;
})(Get10, E);


Get10.Game = (function(Get10, E) {

  var Game = function(manager) {
    this.manager = manager;
    E.Scene.call(this);
  };
  E.inherit(Game, E.Scene);

  E.extend(Game, {
    initialize: function() {
      this.grid = new Get10.LogicalGrid(this);
      this.score = new Score(this);
      this.gameObjects.clear();
      this.state = "normal"; // cleaning | filling
      this.initResources();
      this.grid.initCells();
      this.score.setScore(0);
    },

    reset: function(){
      E.Audio.play("START");
    },

    initResources: function() {
      E.Audio.init();
      for (var key in Get10.cfg.audio) {
        E.Audio.load(key, Get10.cfg.audio[key]);
      }
    },

    isAnimating: function() {
      var animatingObj =
        this.gameObjects.find(function(obj) {
          obj.isAnimating();
        });

      return animatingObj != null;
    },

    update: function(dt) {
      this.checkClick();
      E.Scene.prototype.update.call(this, dt);
      if (!this.isAnimating() && this.grid.state == "cleaning") {
        this.grid.cleanAndRefill();

        if(this.grid.getMax() == 10){
          this.manager.win();
        }else if(!this.grid.canMove()){
          this.manager.loose();
        }
      }
    },

    draw: function() {
      E.Core.clearCanvas();
      E.Scene.prototype.draw.call(this);
    },

    checkClick: function() {
      if (this.state == "normal") {
        if(E.Input.isClicked()){
          this.grid.onclick(E.Input.getCursorPos());
        }
      }
    }
  });

  var Score = function(game){
    this.game = game;
    this.score = 0;
    this.container = document.getElementById("score");
    this.topScoreContainer = document.getElementById("top-score");
    this.topScoreContainer.innerHTML = this.game.manager.getTopScore() + "";
  };

  E.extend(Score, {
    addScore: function(amount) {
      this.score += amount;
      this.container.innerHTML = this.score + '';
    },

    setScore: function(score) {
      this.score = score;
      this.container.innerHTML = this.score + '';
    },

    getScore: function() {
      return this.score;
    }
  });

  return Game;
})(Get10, E);
