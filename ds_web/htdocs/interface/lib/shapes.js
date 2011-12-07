// A simple extension to the canvas API.
var Shapes = {
  
  methods: {
    
    clear: function(fillStyle) {
      if (fillStyle) {
        this.save();
          this.fillStyle = fillStyle;
          this.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.restore();
      }
      else {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    },
    
    drawLine: function(x, y, w, h, strokeStyle, lineWidth, lineCap) {
      // this.save();
        if (strokeStyle) this.strokeStyle = strokeStyle;
        if (lineWidth) this.lineWidth = lineWidth;
        if (lineCap) this.lineCap = lineCap;
        this.beginPath()
        this.moveTo(x, y);
        this.lineTo(x + w, y + h)
        if (this.strokeStyle != 'transparent') this.stroke();
      // this.restore();
    },
    
    drawRect: function(x, y, w, h, fillStyle, strokeStyle, lineWidth) {
      // this.save();
        if (fillStyle) this.fillStyle = fillStyle;
        if (strokeStyle) this.strokeStyle = strokeStyle;
        if (lineWidth) this.lineWidth = lineWidth;
        this.fillRect(x, y, w, h);
        if (this.strokeStyle != 'transparent') this.strokeRect(x, y, w, h);
      // this.restore();
    },
    
    drawSquare: function(x, y, w, fillStyle, strokeStyle, lineWidth) {
      this.drawRect(x, y, w, w, fillStyle, strokeStyle, lineWidth);
    },
    
    drawCircle: function(x, y, radius, fillStyle, strokeStyle, lineWidth, startAngle, endAngle, anticlockwise) {
      // sensible defaults
      if (anticlockwise === undefined) anticlockwise = true;
      if (startAngle === undefined) startAngle = 0;
      if (endAngle === undefined) endAngle = Math.PI * 2;
      // this.save();
        if (fillStyle) this.fillStyle = fillStyle;
        if (strokeStyle) this.strokeStyle = strokeStyle;
        if (lineWidth) this.lineWidth = lineWidth;
        this.beginPath();
        this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        if (this.fillStyle != 'transparent') this.fill();
        if (this.strokeStyle != 'transparent') this.stroke();
      // this.restore();
    },
    
    drawTextCentered: function(text, x, y, fillStyle, strokeStyle, lineWidth, font) {
      // this.save();
        // x -= this.measureText(text).width / 2;
        this.drawText(text, x, y, fillStyle, strokeStyle, lineWidth, font, 'center', 'middle');
      // this.restore();
    },
    
    drawText: function(text, x, y, fillStyle, strokeStyle, lineWidth, font, textAlign, textBaseline) {
      // this.save();
        if (fillStyle) this.fillStyle = fillStyle;
        if (strokeStyle) this.strokeStyle = strokeStyle;
        if (lineWidth) this.lineWidth = lineWidth;
        if (font) this.font = font;
        if (textAlign) this.textAlign = textAlign;
        if (textBaseline) this.textBaseline = textBaseline;
        this.fillText(text, x, y);
        if (this.strokeStyle != 'transparent') this.strokeText(text, x, y);
      // this.restore();
    },
    
    drawSVGPath: function(path, fillStyle, strokeStyle, lineWidth) {
      // this.save();
        if (fillStyle) this.fillStyle = fillStyle;
        if (strokeStyle) this.strokeStyle = strokeStyle;
        if (lineWidth) this.lineWidth = lineWidth;
        var pat = /(\s+)|\w(?:(\s*,?\s*)\d+(?:\.\d+)?)+/ig;
        this.beginPath();
        var segment;
        while (segment = pat.exec(path)) {
          segment = segment[0];
          if (RegExp.$1) continue;  // skip whitespace
          var command = segment[0];
          var params = segment.match(/\d+(?:\.\d+)?/g);
          for (var i in params) params[i] = parseFloat(params[i]);
          switch (command) {
          case 'M':
            this.moveTo.apply(this, params);
            break;
          case 'L':
            this.lineTo.apply(this, params);
            break;
          case 'C':
            this.bezierCurveTo.apply(this, params);
            break;
          case 'A':
            break;  // not implemented
            this.arcTo(params[5], params[6], params[5], params[6], params[0]);
            break;
          case 'Z':
          case 'z':
            this.closePath();
            break;
          default:
            if (console) console.error("I don't know this path command: " + command +
              '(' + params.length + ' params)');
          }
        }
        if (this.fillStyle != 'transparent') this.fill();
        if (this.strokeStyle != 'transparent') this.stroke();
      // this.restore();
    },
    
    zoom: function(factor) {
      this.scale(factor, factor);
    },
    
    resizeCanvas: function(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    
  },
  
  getContext: function(canvas) {
    var context = canvas.getContext('2d');
    canvas.context = context;
    var methods = this.methods;
    for (method in methods) {
      context[method] = methods[method];
    }
    return context;
  },
  
  initCanvas: function(id, width, height, fillStyle) {
    var canvas;
    if (id) {
      canvas = document.getElementById(id);
    }
    else {
      canvas = document.createElement('canvas');
    }
    if (!canvas || !canvas.getContext) return;
    var context = Shapes.getContext(canvas);
    if (width && height) context.resizeCanvas(width, height);
    if (fillStyle) context.clear(fillStyle);
    return context;
  }
  
};
