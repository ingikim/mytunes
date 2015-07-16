// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('ended', function(song){
      this.shift();
    }, this);

    this.on('dequeue', function(song){
      this.dequeue(song);
    }, this);
  },

  enqueue: function(song) {

    this.add(song);

  },

  dequeue: function(song) {
    this.remove(song);
  },

  emptied: function() {
    this.trigger("emptied", this);
  },

  playFirst: function() {
    this.first().play();
  }

});