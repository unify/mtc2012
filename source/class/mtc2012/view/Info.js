/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Info", {
	include : [unify.view.StaticView],

	construct : function() {
		unify.view.StaticView.call(this);
	},

	members : 
	{
		getTitle : function(type, param) {
			return "Info";
		},
		
		_createView : function() {
			var navigationBar = new unify.ui.container.NavigationBar(this);
			this.add(navigationBar);
			
			var refresh = new unify.ui.basic.NavigationButton("Refresh");
			refresh.setExecute("refresh");
			navigationBar.add(refresh, { position: "right" });
			
			var label = new unify.ui.basic.Label("No photo selected!");
			this.add(label);
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Info);
