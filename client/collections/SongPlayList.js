var SongPlayList = Songs.extend({

  initialize: function() {
    this.on('dequeueList', function(song){
      this.dequeue(song);
    }, this);
  },

  enqueue: function(song) {
    this.add(song);
  },
  dequeue: function(song) {
    this.remove(song);
  },
});