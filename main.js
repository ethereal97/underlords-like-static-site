'use strict';

function include(path, type) {
  if (!('BASE_URL' in window && window.BASE_URL)) {
    var src = document.currentScript.src.split('/');
    src.pop();
    window.BASE_URL = src.join('/');
  }
  
  var _path = [window.BASE_URL, path].join('/');
  var script = document.createElement('script');
  
  script.type = type || 'text/javascript';
  script.src = _path;
  
  script.import = function (resolved, rejected) {
    if (typeof resolved === 'function') {
      this.addEventListener('load', resolved);
    }
    
    if (typeof rejected === 'function') {
      this.addEventListener('error', rejected);
    }
    
    document.body.appendChild(this);
    
    return this;
  }
  
  return script;
}

include('js/app.js', 'module').import(null, () => console.error('Failed to import'))
