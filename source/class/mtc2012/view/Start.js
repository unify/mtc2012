/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Start", {
	include : [unify.view.StaticView],

	construct : function() {
		unify.view.StaticView.call(this);
	},

	members : 
	{
		getTitle : function(type, param) {
			return "Flicky";
		},
		
		_createView : function() {
      var navigationBar = new unify.ui.container.NavigationBar(this);
  		this.add(navigationBar);
      
			var content = new unify.ui.basic.Label("Hello MTC");
      content.setMarginTop(20);
      content.setMarginBottom(20);
      content.setMarginLeft(20);
			this.add(content, { flex: 1 });
			
			var nav1 = new unify.ui.basic.NavigationButton("Interesting");
			nav1.setGoTo("interesting");
			this.add(nav1);
			
			var nav2 = new unify.ui.basic.NavigationButton("Recent");
			nav2.setGoTo("recent");
			this.add(nav2);
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Start);
