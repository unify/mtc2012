/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Interesting", {
	include : [unify.view.RemoteView],

	construct : function() {
		unify.view.RemoteView.call(this);
	},

	members : 
	{
		getTitle : function(type, param) {
			return "Recent";
		},
		
		_createView : function() {
			var refresh = new unify.ui.basic.NavigationButton("Refresh");
			refresh.setExecute("refresh");
			
			var navigationBar = new unify.ui.container.NavigationBar(this);
			navigationBar.add(refresh, { position: "right" });
			this.add(navigationBar);
			
			var content = this.__content = new unify.ui.container.Scroll(new unify.ui.layout.VBox());
			content.setEnableScrollX(false);
			this.add(content, {flex: 1});
		},
		
		_getBusinessObject : function() {
			return mtc2012.business.Flickr.getInstance();
		},
		
		_getServiceName : function() {
			return "interesting";
		},
		
		_renderData : function(data) {
			var content = this.__content;
			content.removeAll();
			
			if(!data){
				return;
			}
			
			var photos = data.query.results.photo;
			
			for (var i=0, l=photos.length; i<l; i++) {
				content.add(this.__createImage(photos[i]));
			}
		},
		
		
		/**
		 * Converts a data entry into a HTML fragment for an image element
		 *
		 * @param entry {Map} Data structure
		 * @return {String} HTML string
		 */
		__createImage : function(entry) {
			var url = ["http://farm", entry.farm, ".static.flickr.com/", entry.server, "/", entry.id, "_", entry.secret, "_s.jpg"].join("");
			var img = new unify.ui.basic.NavigationButton(null, url);
			img.setMinWidth(75);
			img.setMinHeight(100);
			img.setGoTo("photo:" + entry.id);
			
			return img;
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Interesting);
