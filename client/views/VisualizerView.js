var VisualizerView = Backbone.View.extend({

  tagName: 'canvas',

  initialize: function() {
    this.context = new webkitAudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.connect(this.context.destination);

    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.times = new Uint8Array(this.analyser.frequencyBinCount);

    this.HEIGHT = 360;
    this.WIDTH = 600;

    this.AudioConnected = false;

  },

  render: function(audio) {
    if (!this.AudioConnected) {
      this.source  = this.context.createMediaElementSource(audio);
      this.source.connect(this.analyser);
      this.AudioConnected = true;
    }
    this.draw();
  },

  draw: function() {

    this.analyser.getByteTimeDomainData(this.times);
    this.analyser.getByteFrequencyData(this.freqs);

    this.el.width = this.WIDTH;
    this.el.height = this.HEIGHT;
    var drawContext = this.el.getContext('2d');

    var barWidth = this.WIDTH/this.analyser.frequencyBinCount;
    for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
      var value = this.times[i];
      var percent = value / 256;
      var barHeight = this.HEIGHT * percent;
      var offset = this.HEIGHT - barHeight - 1;
      drawContext.fillStyle = 'black';
      drawContext.fillRect(i * barWidth, offset, 1,2);
    }
    for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
      var value = this.freqs[i];
      var percent = value / 256;
      var barHeight = this.HEIGHT * percent;
      var offset = this.HEIGHT - barHeight - 1;
      var hue = i/this.analyser.frequencyBinCount * 360;
      drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      drawContext.fillRect(i * barWidth, offset, barWidth, barHeight);
    }
    requestAnimationFrame(this.draw.bind(this));
  }

});