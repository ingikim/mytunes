var PlayListButtonView = Backbone.View.extend({

  tagName: "button",

  initialize: function() {
    this.render();
  },

  events: {
    "click" : function() {
      this.clicked();
    },
  },

  render: function() {
    this.$el.text('Song Queue');
    this.$el.addClass('playListButton');
  },

  clicked: function() {
    if (this.$el.text() === 'Song Queue') {

      this.$el.text('PlayList');
    }
    else {
      this.$el.text('Song Queue');
    }
    this.trigger('clicked', this);
  },
});