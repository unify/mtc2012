/* ************************************************************************

  mtc2012

 ************************************************************************ */

/**
 * Start View
 */
core.Class("mtc2012.view.Owner", {
	include : [unify.view.ServiceView],

	construct : function() {
		unify.view.ServiceView.call(this);
	},

	members : 
	{
		__content : null,
		__template : null,
		
		getTitle : function(type, param) {
			return "Owner";
		},
		
		_createView : function() {
			var navigationBar = new unify.ui.container.NavigationBar(this);
      	this.add(navigationBar);
      	
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
				"photo" : mtc2012.view.Photo.getInstance().getParam()
			};
		},
		
		_getRenderVariant : function() {
			return mtc2012.view.Photo.getInstance().getParam();
		},
		
		
		// overridden
		_renderData : function(data) {
			if(!data){
				this.__content.clear();
				return;
			}
			
			var template = this.__template;
			if (!template) {
				var html = "<ul>";
				html += "<li><label>Name</label><span>{realname}</span></li>";
				html += "<li><label>Nick</label><span>{username}</span></li>";
				html += "</ul>";
				
				template = this.__template = new qx.util.Template(html);
			}
			
			var owner = data.query.results.photo.owner;
			this.__content.replace(template.run(owner));
		}
	}
});

unify.core.Singleton.annotate(mtc2012.view.Owner);
