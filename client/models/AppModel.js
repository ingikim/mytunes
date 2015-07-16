// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());
    this.set('playList', new SongPlayList());
    this.set('playListSelected', false);

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    // Playing a Song
    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);    

    // Queuing a Song to List
    params.library.on('enqueue', function(song){
      if (!this.get('playListSelected')){
        this.get('songQueue').enqueue(song);
      }
      else {
        this.get('playList').enqueue(song);
      }
    }, this);

    // // Dequeuing a Song from List
    // params.library.on('dequeue', function(song){
    //   this.get('songQueue').dequeue(song);
    // }, this);

    // Song has Ended
    // params.library.on('ended', function(song){
    //   this.get('songQueue').dequeue(song);
    // }, this);


    // Song List is Empty
    this.get('songQueue').on('emptied', function(){
      this.set('currentSong', '');
    }, this);
    

  }

});
