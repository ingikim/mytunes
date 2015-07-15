// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function(){
    // Triggering an event here will also trigger the event on the collection
    console.log("Playing: ", this.get("title"));
    this.trigger('play', this);
  },

  enqueue: function() {
    //debugger;
    this.trigger('enqueue',this);
  },

  dequeue: function() {
    this.trigger('dequeue', this);
  },

  ended: function() {
    this.trigger('ended', this);
  }

});
