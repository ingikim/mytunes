// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay />',

  initialize: function() {
  },

  setSong: function(song){
    this.model = song;
    this.render();
    //console.log("Set Song:", this.model);
  },

  render: function(){
    this.$el.bind('ended', $.proxy(function(){
      //console.log(e);
      //console.log(this);
      //debugger;
      if (this.model !== ''){
        this.model.ended();
      }
    },this));
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  }

});
