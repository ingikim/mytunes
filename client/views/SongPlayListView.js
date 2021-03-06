var SongPlayListView = Backbone.View.extend({
  tagName: "table",

  initialize: function() {
    this.render();
    this.collection.on('add', this.render, this);
    this.collection.on('remove', this.render, this);
  },

  render: function() {
    
    this.$el.children().detach();

    this.$el.html('<th>Play List</th>').append(
      this.collection.map(function(song){
        return new SongPlayListEntryView({model: song}).render();
      })
    );
  }


});