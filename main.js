'use strict';

var src = document.currentScript.src.split('/');
src.pop();
const BASE_URL = window.BASE_URL = src.join('/');

function init() {
  var q = new URLSearchParams(location.search);
  
  if (q.has('dev') && !('eruda' in window)) {
    include('https://cdn.jsdelivr.net/npm/eruda').import(() => eruda.init())
  }
  
  include('js/app.js', 'module').import(null, () => console.error('Failed to import'))
}

function include(path, type) {
  if (! path.match(/^https?\:\/\/.+$/)) {
    path = [BASE_URL, path].join('/');
  }
  var script = document.createElement('script');
  
  script.type = type || 'text/javascript';
  script.src = path;
  
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

window.addEventListener('load', () => init.call(window));