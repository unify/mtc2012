/* ========================================================================

	MobileTechCon 2012 - Unify Tutorial

   ========================================================================= */

/** #asset(mtc2012/*) */

/**
 * Unify application class
 */
core.Class("mtc2012.Application", {
  include : [unify.Application],
  
  
  construct : function() {
    unify.Application.call(this);
  },
  
  /*
  *****************************************************************************
    MEMBERS
  *****************************************************************************
  */
  members: {
    
    //Overidden
    _getTheme : function() {
    	return new unify.theme.AndroidHaloDark();
      //return new unify.theme.Dark();
    },
    
    /**
     * This is the main function of the application. It will get
     * automatically get called after everything is loaded.
     */
    main: function() {
      // Call super class
      unify.Application.prototype.main.call(this);
      
      // Configure application
      document.title = "Flicky";
      
      // Create view managers
      var MasterViewManager = new unify.view.ViewManager("mmaster");
      MasterViewManager.register(mtc2012.view.Start, true);
      MasterViewManager.register(mtc2012.view.Recent);
      MasterViewManager.register(mtc2012.view.Interesting);
      this.add(MasterViewManager);
      
      var DetailViewManager = new unify.view.ViewManager("mdetail");
      DetailViewManager.register(mtc2012.view.Info, true);
      DetailViewManager.register(mtc2012.view.Photo);
      
      var MetaViewManager = new unify.view.ViewManager("mmeta");
      MetaViewManager.register(mtc2012.view.Meta, true);
      MetaViewManager.register(mtc2012.view.Owner);
      MetaViewManager.register(mtc2012.view.Location);
      MetaViewManager.setDisplayMode('popover');
      
      var SplitViewManager = new unify.view.SplitViewManager(MasterViewManager, DetailViewManager);
      this.add(SplitViewManager);
      
      // Add at least one view manager to the navigation managment
      var navigation = unify.view.Navigation.getInstance();
      navigation.register(MasterViewManager);
      navigation.register(DetailViewManager);
      navigation.setStartView([mtc2012.view.Start, mtc2012.view.Info]);
      navigation.init();
    }
  }
});
