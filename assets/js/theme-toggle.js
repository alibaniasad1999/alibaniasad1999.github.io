(function(){
  var storageKey = 'theme-preference';

  function setIcon(theme){
    var icon = document.getElementById('theme-icon');
    if(!icon) return;
    if(theme === 'dark'){
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  function applyTheme(theme){
    document.documentElement.classList.remove('theme-dark','theme-light');
    document.documentElement.classList.add('theme-' + theme);
    try{ localStorage.setItem(storageKey, theme); } catch(e){}
    setIcon(theme);
  }

  function getPreferredTheme(){
    try{
      var stored = localStorage.getItem(storageKey);
      if(stored === 'dark' || stored === 'light') return stored;
    } catch(e){}
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function init(){
    var toggle = document.getElementById('theme-toggle');
    var theme = getPreferredTheme();
    applyTheme(theme);

    if(toggle){
      toggle.addEventListener('click', function(){
        var cur = document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
        var next = cur === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    } else {
      console.warn('Theme toggle button not found');
    }

    // Listen to system changes
    try{
      if(!localStorage.getItem(storageKey) && window.matchMedia){
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e){
          applyTheme(e.matches ? 'dark' : 'light');
        });
      }
    } catch(e){}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
