E.GameObject = (function(E){
  var GameObject = function(renderableObj){
    this.renderableComponent = renderableObj;
  };

  GameObject.prototype.update = function(dt){};
  GameObject.prototype.draw = function(){};
  GameObject.prototype.getRenderable = function(){ return this.renderableComponent;};
  GameObject.prototype.getXform = function(){return this.renderableComponent.getXform();};

  return GameObject;
})(E);

E.GameObjectSet = (function(E){
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
})(E);
