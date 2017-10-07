

Get10.Menu = (function(){

  var Menu = function(menuId, eventMap){
    this.container = document.getElementById(menuId);
    this._bindEvents(eventMap);
  };

  Menu.prototype._bindEvents = function(eventMap){
    var self = this;
    Object.keys(eventMap).map(function(key, index) {
      var parts = key.split(" ");
      var eventName = parts[0];
      var selector = parts[1];

      var targets = self.container.querySelectorAll(selector);
      if(typeof eventMap[key] === "function"){
        self._bindEvent(targets, eventName, eventMap[key]);
      }
    });
  };

  Menu.prototype._bindEvent = function(elements, eventName, callback){
    if(elements.length == undefined){
      elements.addEventListener(eventName, callback);
    }else{
      for(var i = 0; i < elements.length; i++){
        this._bindEvent(elements[i], eventName, callback);
      }
    }
  };

  Menu.prototype.show = function(){
    document.body.style.overflow = "hidden";
    this.container.style.display = "block";
  };

  Menu.prototype.hide = function(){
    document.body.style.overflow = "auto";
    this.container.style.display = "none";
  };

  Menu.prototype.findFirst = function(selector){
    var els = this.container.querySelectorAll(selector);
    return els[0] || {};
  };

  return Menu;
})();

Get10.MenuManager = (function(){
  var MenuManager = function(){
    this.menuMap = {};
  };

  MenuManager.prototype.addMenu = function(name, menu){
    this.menuMap[name] = menu;
  };

  MenuManager.prototype.removeMenu = function(name){
    delete(this.menuMap[name]);
  };

  MenuManager.prototype.get = function(name){
    return this.menuMap[name];
  };

  MenuManager.prototype.show = function(name){
    if(this.menuMap.hasOwnProperty(name)){
      for(var k in this.menuMap){
        this.menuMap[k].hide();
      }

      this.menuMap[name].show();
    }
  };

  MenuManager.prototype.hideAll = function(){
    for(var k in this.menuMap){
      this.menuMap[k].hide();
    }
  };

  return MenuManager;
})();
