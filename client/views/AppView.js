// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});
    this.songPlayListView = new SongPlayListView({collection: this.model.get('playList')});

    this.visualizer = new VisualizerView();

    // Buttons on the page
    this.playListButtonView = new PlayListButtonView();
    this.playListMenuView = new PlayListMenuView();
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
      this.visualizer.render(this.playerView.el);
    }, this);
    this.playListButtonView.on('clicked', function(){
      this.model.set("playListSelected", !this.model.get("playListSelected"));
    }, this);
    this.playListMenuView.on('addList', function(){
      this.model.get('songQueue').addList(this.model.get('playList'));
    }, this);
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.playListButtonView.$el,
      this.libraryView.$el,
      this.songQueueView.$el,
      this.songPlayListView.$el,
      this.playListMenuView.$el,
      this.visualizer.$el,
    ]);
  }

});
