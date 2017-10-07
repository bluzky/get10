var Get10 = Get10 || {};

Get10.Animation = (function(Get10, E){
  var ZoomOutAnimation = function(xForm, duration, callback){
    this.xForm = xForm;
    this.duration = duration;
    this.elapsedTime = 0;
    this.callback = callback;
  };

  ZoomOutAnimation.prototype.update = function(dt){
    this.elapsedTime += dt;
    this.elapsedTime = Math.min(this.elapsedTime, this.duration);

    var scale = E.EasingFunctions.easeInQuad(this.elapsedTime/this.duration);
    scale = (1 - scale);
    this.xForm.setSize(scale, scale);

    // callback when animation done
    if(this.elapsedTime == this.duration && this.callback != null){
      this.callback(this);
    }
  };

  var MoveAnimation = function(xForm, toX, toY, duration, callback){
    this.xForm = xForm;
    this.fromX  = xForm.getXPos();
    this.fromY  = xForm.getYPos();
    this.xDistance  = toX - this.fromX;
    this.yDistance  = toY - this.fromY;
    this.duration = duration;
    this.elapsedTime = 0;
    this.callback = callback;
  };

  MoveAnimation.prototype.update = function(dt){
    this.elapsedTime += dt;
    this.elapsedTime = Math.min(this.elapsedTime, this.duration);

    var scale = E.EasingFunctions.easeInQuad(this.elapsedTime/this.duration);
    var xPos = this.fromX + scale * this.xDistance,
        yPos = this.fromY + scale * this.yDistance;
    this.xForm.setPosition(xPos, yPos);

    // callback when animation done
    if(this.elapsedTime == this.duration && this.callback != null){
      this.callback(this);
    }
  };

  return {
    ZoomOutAnimation: ZoomOutAnimation,
    MoveAnimation: MoveAnimation
  };
})(Get10, E);
