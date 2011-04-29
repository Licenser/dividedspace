document.setTitle = function(text) {
  this.title = this.originalTitle + text;
}
document.originalTitle = document.title;

DrawEngine = {
  
  initialize: function() {
    setInterval(this.fps, 1000);
  },
  
  fps: (function() {
    function fps() {
      var text = ' - ';
      for (var name in fps.loops) {
        var loop = fps.loops[name];
        text += name + ': ' + (loop.count - loop.skipped)
          + '/' + loop.count + ' fps ';
        loop.count = 0;
        loop.skipped = 0;
      }
      // if (fps.max) text += ' (of ' + fps.max + ')';
      document.setTitle(text + fps.info);
    }
    fps.loops = [];
    fps.max = 30;
    fps.info = '';
    fps.pause = false;
    return fps;
  })(),
  
  startLoop: function(name, callback, maxFPS) {
    var fps = this.fps;
    if (!maxFPS) maxFPS = fps.max;
    var loop = {
      name: name, maxFPS: maxFPS, callback: callback,
      index: 0, count: 0, skipped: 0,
      draw: function() {
        return this.callback(this.index, this);
      }
    };
    fps.loops[name] = loop;
    setInterval(function() {
      if (fps.pause || loop.count >= loop.maxFPS) return;
      loop.index++
      if (loop.draw() === 'skipped') loop.skipped++;
      loop.count++;
    }, 1000 / maxFPS);
    return fps.loops[name];
  }
  
};