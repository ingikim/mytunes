// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {

    this.render();
    this.collection.on('add', this.addHandle, this);
    this.collection.on('remove', this.removeHandle, this);
  },

  addHandle: function(song) {
    if (this.collection.length === 1) {
      this.collection.playFirst();
    }
    this.render();
  },

  removeHandle: function(song) {
    if (this.collection.length >= 1) {

      this.collection.playFirst();
    }
    else {

      this.collection.emptied();
    }

    this.render();
  },

  render: function() {
    
    this.$el.children().detach();

    this.$el.html('<th>Song Queue</th>').append(
      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }

});
