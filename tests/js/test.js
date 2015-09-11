/*!
 * Testing social share button
 *
 */
 
;
(function(){
  "use strict";
  
  var button = document.querySelector( '.social-share-button' );
  var share  = new window.social_share();
  
  share.setup( button );
  
})();