E.Renderable = (function(E){
  function Renderable(shader) {
      // this.shader = shader;         // the shader for shading this object
      this.mXform = new E.Transform(); // transform that moves this object around
      this.color = "#000";    // color of pixel
  }


  Renderable.prototype.draw = function () {
    var ctx = E.Core.getContext();
    var form = this.mXform.getXform();
    ctx.setTransform(form[0], form[3], form[1], form[4], form[2], form[5]);
    ctx.fillStyle = this.color || "#000";
  };

  Renderable.prototype.getXform = function () { return this.mXform; };
  Renderable.prototype.setColor = function (color) { this.color = color; };
  Renderable.prototype.getColor = function () { return this.color; };

  return Renderable;
})(E);
