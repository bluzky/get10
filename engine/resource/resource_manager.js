var E = E || {};
E.ResourceManager = (function(E) {
  var _resourceMap = {},
    _loadingCount = 0,
    _totalLoad = 0,
    _loadCompletedCallback;

  var ResourceEntry = function(name, location) {
    this._asset = name;
    this._refCount = 0;
    this._location = location;
  };


  var setLoadCompletedCallback = function(callback) {
    _loadCompletedCallback = callback;
  };

  var checkForAllResourceLoaded = function() {
    if (_loadingCount == 0 && _loadCompletedCallback != null) {
      var func = _loadCompletedCallback;
      _loadCompletedCallback = null;
      func();
    }
  };

  var asyncLoadResource = function(name, location) {
    _resourceMap[name] = new ResourceEntry(name, location);
    _loadingCount++;
  };

  var asyncLoadCompleted = function(name, data) {
    if (!isResourceLoaded(name))
      alert("E.asyncLoadCompleted: [" + name + "] not in map!");
    var entry = _resourceMap[name] || {};
    entry._asset = data;
    entry._refCount++;
    _loadingCount--;
  };

  var isResourceLoaded = function(name) {
    return name in _resourceMap;
  };

  var retrieveResource = function(name) {
    var r = null;
    if (name in _resourceMap)
      r = _resourceMap[name]._asset;
    return r;
  };

  var unloadResource = function(name) {
    if (name in _resourceMap) {
      _resourceMap[name]._refCount++;
      if (_resourceMap[name]._refCount == 0) {
        delete _resourceMap[name];
      }
    }
  };

  function incAssetRefCount(name) {
    if (name in _resourceMap) {
      _resourceMap[name]._refCount++;
    }
  }

  return {
    setLoadCompletedCallback: setLoadCompletedCallback,
    checkForAllResourceLoaded: checkForAllResourceLoaded,
    asyncLoadResource: asyncLoadResource,
    asyncLoadCompleted: asyncLoadCompleted,
    isResourceLoaded: isResourceLoaded,
    getResouce: retrieveResource,
    unloadResource: unloadResource,
    incAssetRefCount: incAssetRefCount,
  };
})(E);
