/* ************************************************************************

   Flicky

   Copyright:
     2010-2011 Deutsche Telekom AG, Germany, http://telekom.com

************************************************************************ */


core.Class("mtc2012.business.Flickr", {
	include : [unify.business.RemoteData],

	construct : function() {
		unify.business.RemoteData.call(this);
		
		this.setEnableProxy(false);
		
		//var yqlBase = "http://query.yahooapis.com/v1/public/yql";
		var yqlBase = "/flickr/v1/public/yql";
		
		this._addService("recent", {url:yqlBase + "?q=select%20*%20from%20flickr.photos.recent(32)%20WHERE%20api_key%3D4cef362b3a14c3ee337a6cd98c2b3344&format=json&diagnostics=true", keep: 60}); // 1 minute
		this._addService("interesting", {url:yqlBase + "?q=select%20*%20from%20flickr.photos.interestingness(32)%20WHERE%20api_key%3D4cef362b3a14c3ee337a6cd98c2b3344&format=json&diagnostics=true", keep: 60*60*24}); // 1 day
		this._addService("info", {url:yqlBase + "?q=select%20*%20from%20flickr.photos.info%20where%20photo_id%3D'{photo}'%20AND%20api_key%3D4cef362b3a14c3ee337a6cd98c2b3344&format=json&diagnostics=true", keep: 60*60*24*14}) // 14 days
	}
});

unify.core.Singleton.annotate(mtc2012.business.Flickr);
