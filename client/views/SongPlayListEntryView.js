var SongPlayListEntryView = Backbone.View.extend({
  // your code here!
  tagName: 'tr',

  template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),

  events: {
    'click': function() {
      this.model.dequeueList();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});