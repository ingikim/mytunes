var VisualizerView = Backbone.View.extend({

  tagName: 'canvas',

  initialize: function() {
    this.context = new webkitAudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.connect(this.context.destination);

    //this.analyser.fftSize = 1024;

    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
    this.times = new Uint8Array(this.analyser.frequencyBinCount);

    this.HEIGHT = 200;
    this.WIDTH = 400;

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

    var drawContext = this.el.getContext('2d');
    this.el.width = this.WIDTH;
    this.el.height = this.HEIGHT;

    var timeBarWidth = this.WIDTH/this.analyser.frequencyBinCount;
    for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
      var value = this.times[i];
      var percent = value / 256;
      var barHeight = this.HEIGHT * percent;
      var offset = this.HEIGHT - barHeight - 1;
      drawContext.fillStyle = 'black';
      drawContext.fillRect(i * timeBarWidth, offset, 1,2);
    }
    var freqBarWidth = this.WIDTH/this.analyser.frequencyBinCount / 1.5;
    for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
      var value = this.freqs[i];
      var percent = value / 256;
      var barHeight = this.HEIGHT * percent;
      var offset = this.HEIGHT - barHeight - 1;
      var hue = i/this.analyser.frequencyBinCount * 360;
      drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      drawContext.fillRect(i * freqBarWidth, offset, freqBarWidth, barHeight);
      drawContext.fillRect(this.WIDTH - i * freqBarWidth, offset, freqBarWidth, barHeight);
    }
    requestAnimationFrame(this.draw.bind(this));
  }

});