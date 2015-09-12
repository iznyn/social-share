/*!
 * Testing social share button
 *
 */
 
;
(function(){
  "use strict";
  
  jQuery( '.social-share-button' ).each( function()
  {
    var button = jQuery(this)[0];
    var share  = new window.social_share();
    share.setup( button );
  });
  
})();