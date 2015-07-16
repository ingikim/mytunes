// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('ended', function(song){
      //console.log(song);
      debugger;
      this.dequeue(song);
      //this.shift();
    }, this);
  },

  enqueue: function(song) {
    //debugger;
    // console.log("Queue Length: ", this.length, " , ", "Queue: ", this);
    // if (this.length === 0) {
    //   this.add(song);
    //   song.play();
    // }
    // else {
    //   //debugger;
    //   this.add(song);
    // }
    this.add(song);
    //console.log(this);

  },

  dequeue: function(song) {
    //debugger;
    this.remove(song);
    console.log(this.length);
  },

  emptied: function() {
    this.trigger("emptied", this);
  },

  playFirst: function() {
    //debugger;
    this.first().play();
  }

});