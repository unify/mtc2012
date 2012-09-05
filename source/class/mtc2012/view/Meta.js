/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Meta", {
	include : [unify.view.ServiceView],

	construct : function() {
		unify.view.ServiceView.call(this);
	},

	members : 
	{
		__content : null,
		__template : null,
		
		getTitle : function(type, param) {
			return "Meta data";
		},
		
		_createView : function() {
			var navigationBar = new unify.ui.container.NavigationBar(this);
			this.add(navigationBar);
			
			var content = this.__content = {
				title : new unify.ui.basic.Label("Title "),
				id: new unify.ui.basic.Label("ID "),
				desc: new unify.ui.basic.Label("Description "),
				comments: new unify.ui.basic.Label("Comments ")
			};
			
			var maxWidth = 1000;
			content.title.set({
				autoCalculateSize : true,
				maxWidth: maxWidth
			});
			content.id.set({
				autoCalculateSize : true,
				maxWidth: maxWidth
			});
			content.desc.set({
				autoCalculateSize : true,
				maxWidth: maxWidth
			});
			content.comments.set({
				autoCalculateSize : true,
				maxWidth: maxWidth
			});
			
			this.add(content.title);
			this.add(content.id);
			this.add(content.desc);
			this.add(content.comments);
		},
		
		_getBusinessObject : function() {
			return mtc2012.business.Flickr.getInstance();
		},
		
		_getServiceName : function() {
			return "info";
		},
		
		_getServiceParams : function() {
			return {
				"photo" : mtc2012.view.Photo.getInstance().getParam()
			};
		},
		
		_getRenderVariant : function() {
			return mtc2012.view.Photo.getInstance().getParam();
		},
		
		
		// overridden
		_renderData : function(data) {
			var content = this.__content;
			
			if(!data){
				return;
			}
			
			var photo = data.query.results.photo;
			
			content.title.setValue("Title " + photo.title);
			content.id.setValue("ID " + photo.id);
			content.desc.setValue("Description " + photo.description);
			content.comments.setValue("Comments " + photo.comments);
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Meta);
