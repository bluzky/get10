var E = E || {};

E.Scene = (function(E){
  function Scene(){
    this.gameObjects = new E.GameObjectSet();
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
})(E);
