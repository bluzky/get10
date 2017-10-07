E.Transform = (function(E){
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
})(E);
