var Get10 = Get10 || {};
Get10.SelectedMask = (function(Get10, E){
  var SelectedMask = function(w, h){
    this.width = w;
    this.height = h;
  };

  SelectedMask.prototype.draw = function(){
    var ctx = E.Core.getContext();

    var center = {
      x:  this.width/2,
      y:  this.height/2
    };
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.height);
    ctx.lineTo(center.x, center.y);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.width, 0);
    ctx.lineTo(center.x, center.y);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.moveTo(this.width, 0);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(center.x, center.y);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(this.width, this.height);
    ctx.lineTo(center.x, center.y);
    ctx.fill();
  };

  return SelectedMask;
})(Get10, E);


Get10.NumberMask = (function(Get10, E){
  var NumberMask = function(number, w, h){
    this.width = w;
    this.height = h;
    this.number = number;
  };

  NumberMask.prototype.setNumber = function(number){
    this.number = number;
  };

  NumberMask.prototype.draw = function(){
    var ctx = E.Core.getContext();
    ctx.fillStyle = "#fff";
    ctx.font = Get10.cfg.font;
    var text = ctx.measureText(''+ this.number); // TextMetrics object
    var textPos = {
      x: (this.width - text.width) / 2,
      y: this.height - 24
    };

    ctx.fillText(''+ this.number, textPos.x, textPos.y);
  };

  return NumberMask;
})(Get10, E);

Get10.RoundedRectangle = (function(E){
  var RoundedRectangleRender = function(x, y, w, h, r){
    E.Renderable.call(this);
    this.width = w - 4;
    this.height = h - 4;
    this.radius = r || 5;
    this.getXform().setPosition(x, y);
    this.getXform().setAnchorPoint(w/2, h/2);
  };

  E.inherit(RoundedRectangleRender, E.Renderable);

  RoundedRectangleRender.prototype.draw = function(){
    var ctx = E.Core.getContext();
    var form = this.mXform.getXform();
    ctx.setTransform(form[0], form[3], form[1], form[4], form[2], form[5]);
    ctx.fillStyle = this.color || "#000";
    // ctx.fillRect(0, 0, this.width, this.height);
    var w = this.width,
        h = this.height,
        r = this.radius;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(w, 0,   w, h, r);
    ctx.arcTo(w, h, 0,   h, r);
    ctx.arcTo(0,   h, 0,   0,   r);
    ctx.arcTo(0,   0,   w, 0,   r);
    ctx.closePath();
    ctx.fill();

  };



  return RoundedRectangleRender;
})(E);

Get10.Cell = (function(Get10, E){
  var Cell = function(col, row, width, color){
    this.col = col;
    this.row = row;
    this.width = width;
    this.number = Get10.randomChoice([1, 2, 3, 4]);
    this.selected = false;
    this.animating = false;

    this.components = {};
    this.animations = [];

    var renderableComponent = new Get10.RoundedRectangle(col * width, row * width, width, width, 5);
    renderableComponent.setColor(Get10.cfg.colors[this.number - 1]);
    E.GameObject.call(this, renderableComponent);

    var numberMask = new Get10.NumberMask(this.number, this.width, this.width);
    this.components.number = numberMask;
  };

  E.inherit(Cell, E.GameObject);

  E.extend(Cell, {
    addToScene: function(scene){
      this.scene = scene;
      this.scene.addObject(this);
    },

    incNumber: function(d){
      this.number += d;
      var color = Get10.cfg.colors[this.number - 1];
      this.renderableComponent.setColor(color);
      this.components.number.setNumber(this.number);
    },

    getColor: function(){
      return this.renderableComponent.getColor();
    },

    getPosition: function(){
      return this.renderableComponent.getXform().getPosition();
    },

    setPosition: function(x, y){
      this.renderableComponent.getXform().setPosition(x, y);
    },

    update: function(dt){
      for(var i = 0; i < this.animations.length; i++){
        this.animations[i].update(dt);
      }
    },

    setSelected: function(selected){
      this.selected = selected || false;
      if(this.selected){
        var effect = new Get10.SelectedMask(this.width, this.width);
        this.components.selected = effect;
      }else{
        delete(this.components.selected);
      }
    },

    moveTo: function(col, row){
      this.col = col;
      this.row = row;
      var newX = this.width * col,
          newY = this.width * row;
      var animation = new Get10.Animation.MoveAnimation(
        this.renderableComponent.getXform(),
        newX,
        newY,
        Get10.cfg.animation.moveDuration,
        this.removeAnimation.bind(this)
      );

      this.animations.push(animation);
      return this;
    },

    destroy: function(){
      var self = this;
      var newX = this.width * this.col,
          newY = this.width * this.row;
      var animation = new Get10.Animation.ZoomOutAnimation(
        this.renderableComponent.getXform(),
        Get10.cfg.animation.destroyDuration,
        function(animation){
          self.removeAnimation(animation);
          self.scene.removeObject(self);
        }
      );

      this.animations.push(animation);
      return this;
    },

    removeAnimation: function(animation){
      var idx = this.animations.indexOf(animation);
      if(idx >= 0 && idx < this.animations.length){
        this.animations.splice(idx, 1);
      }
    },

    isAnimating: function(){
      return this.animations.length > 0;
    },

    is: function(cell){
      return this.col == cell.col && this.row == cell.row;
    },

    draw: function(){
      var ctx = E.Core.getContext();
      ctx.save();
      this.renderableComponent.draw();
      for(var name in this.components){
        this.components[name].draw();
      }
      ctx.restore();
    }
  });

  return Cell;
})(Get10, E);
