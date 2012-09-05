/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Photo", {
	include : [unify.view.RemoteView],

	construct : function() {
		unify.view.RemoteView.call(this);
		
		this.__title = "Loading...";
	},

	members : 
	{
		__content : null,
		__title : null,
		
		getTitle : function(type, param) {
			return this.__title;
		},
		
		_createView : function() {
			var navigationBar = new unify.ui.container.NavigationBar(this);
      	this.add(navigationBar);
      	
      	var info = new unify.ui.basic.NavigationButton("Info");
			info.setShow("mmeta");
			navigationBar.add(info, { position: "left" });
      	
      	var content = this.__content = new unify.ui.container.Scroll();
      	this.add(content, {flex: 1});
		},
		
		_getBusinessObject : function() {
			return mtc2012.business.Flickr.getInstance();
		},
		
		_getServiceName : function() {
			return "info";
		},
		
		_getServiceParams : function() {
			return {
				"photo" : this.getParam()
			};
		},
		
		
		_getRenderVariant : function() {
			return this.getParam();
		},
		
		
		// overridden
		_renderData : function(data) {
			var content = this.__content;
			content.removeAll();
			
			if(!data){
				delete this.__title;
				this.fireEvent("changeTitle");
				return;
			}
			
			var results = data.query.results;
			if (results == null) {
				delete this.__title;
				var unknown = new unify.ui.basic.Label("Unknown Image!");
				this.__content.add(unknown);
			} else {
				this.__title = results.photo.title;
				this.__content.add(this.__createImage(results.photo));
				this.fireEvent("changeTitle");
				unify.view.ViewManager.get('mmeta').reset();
			}
		},
		
		
		/**
		* Converts a data entry into a HTML fragment for an image element
		*
		* @param entry {Map} Data structure
		* @return {String} HTML string
		*/
		__createImage : function(entry) {
			var url = ["http://farm", entry.farm, ".static.flickr.com/", entry.server, "/", entry.id, "_", entry.secret, "_b.jpg"].join("");
			var img = new unify.ui.basic.Image(url);
			img.setChangeSizeAfterLoad(true);
			
			return img;
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Photo);
