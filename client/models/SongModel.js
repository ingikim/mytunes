// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  defaults: {
    "playcount": 0, 
  },

  play: function(){
    // Triggering an event here will also trigger the event on the collection
    this.trigger('play', this);
  },

  enqueue: function() {
    this.trigger('enqueue',this);
  },

  dequeue: function() {
    this.trigger('dequeue', this);
  },
  dequeueList: function() {
    this.trigger('dequeueList', this);
  },

  ended: function() {
    this.set("playcount", this.get("playcount") + 1);
    this.trigger('ended', this);
  }

});
