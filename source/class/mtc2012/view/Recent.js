/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Recent", {
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
      var navigationBar = new unify.ui.container.NavigationBar(this);
      this.add(navigationBar);
      
      var refresh = new unify.ui.basic.NavigationButton("Refresh");
      refresh.setExecute("refresh");
      navigationBar.add(refresh, { position: "right" });
		},
		
		_getBusinessObject : function() {
			return mtc2012.business.Flickr.getInstance();
		},
		
		_getServiceName : function() {
			return "recent";
		},
		
		_renderData : function(data) {
			var content = this.__content;
			
			if(!data){
				return;
			}
			
      if (content) {
        this.remove(content);
      }
      
			var photo = data.query.results.photo[0];
			content = this.__content = this.__createImage(photo);
      
  		this.add(content, {flex: 1});
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
      img.setMaxHeight(100);
			img.setGoTo("photo:" + entry.id);
			
			return img;
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Recent);
