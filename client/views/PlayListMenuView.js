var PlayListMenuView = Backbone.View.extend({

  initialize: function() {
    //this.songPlayListView = new SongPlayListView({collection: this.collection});
    this.render();
  },

  events: {
    'click .Add': function() {
      this.trigger('addList');
    },
  },

  render: function() {
    this.$el.children().detach();

    this.$el.append("<button class='Add'>Add List to Queue</button>");


  }
});