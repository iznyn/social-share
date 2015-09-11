/*!
 * Social share - Custom social share button
 *
 * The MIT License
 *
 * @author  : M Arif Mahthunisnaini
 * @doc     : -
 * @version : 0.0.1
 *
 */

;
//
//Set to global variable
window.social_share = null;

(function(){
  "use strict";
  
  /*
   * Build prototype
   */
  function construct(){};
  
  construct.prototype = {};
  
  /**
   * Settings
   */
  construct.prototype.vars = 
  {
    windowWidth:    600,
    windowHeight:   400,
    countClass:     '.share-count',
  }
  
  /**
   * Share url list 
   *
   * @var object
   */
  construct.prototype.shareUrls = 
  {
    'facebook':     'https://www.facebook.com/sharer/sharer.php',
    'twitter':      'https://www.twitter.com/share',
    'googleplus':   'https://plus.google.com/share'
  };
  
  /**
   * Share url getter
   *
   * @var function
   * @param string socialName
   * @return string
   */
  construct.prototype.getShareUrl = function( socialName )
  {
    var url = false;
    if ( typeof this.shareUrls[socialName] !== 'undefined' ) {
      url = this.shareUrls[socialName];
    }
    return url;
  };
    
  /**
   * Setup share button 
   *
   * @var function
   * @param object element
   * @return void
   */
  construct.prototype.setup = function( element )
  {
    var url   = element.getAttribute( 'data-url' );
    var title = element.getAttribute( 'data-title' );
    var type  = element.getAttribute( 'data-type' );
    
    if ( type == 'facebook' ) {
      this.setupFacebook( element, url, title );
    } 
    else if ( type == 'twitter' ) {
      this.setupTwitter( element, url, title );
    }
    else if ( type == 'googleplus' ) {
      this.setupGoogleplus( element, url, title );
    }
  }
    
  /**
   * Setup facebook share button 
   *
   * @var function
   * @param object element
   * @param string url
   * @param string title
   * @return void
   */
  construct.prototype.setupFacebook = function( element, url, title )
  {
    var shareUrl = this.getShareUrl( 'facebook' )
                    + '?u=' + url
                    + '&title=' + title;
    
    this.setupShare( element, shareUrl, 'facebook' );
  }
    
  /**
   * Setup twitter share button 
   *
   * @var function
   * @param object element
   * @param string url
   * @param string title
   * @return void
   */
  construct.prototype.setupTwitter = function( element, url, title )
  {
    var shareUrl = this.getShareUrl( 'twitter' )
                    + '?url=' + url
                    + '&title=' + title;
  
    this.setupShare( element, shareUrl, 'twitter' );
  }
    
  /**
   * Setup google plus share button 
   *
   * @var function
   * @param object element
   * @param string url
   * @param string title
   * @return void
   */
  construct.prototype.setupGoogleplus = function( element, url, title )
  {
    var shareUrl = this.getShareUrl( 'googleplus' )
                    + '?url=' + url
                    + '&title=' + title;
                    
    this.setupShare( element, shareUrl, 'googleplus' );
  }
    
  /**
   * Setup share button 
   *
   * @var function
   * @param object element
   * @param string shareUrl
   * @param function callback
   * @return void
   */
  construct.prototype.setupShare = function( element, shareUrl, callback )
  {
    var $this   = this;
    var pageUrl = element.getAttribute( 'data-url' );
    
    //
    //Get count info 
    //
    $this.changeShareCount( element, callback );
    
    //
    //Click button 
    //
    element.addEventListener('click', function()
    {
      var shareWindow = $this.openShareWindow( shareUrl );
      //
      //If window has close run callback 
      var interval = setInterval( function()
      {
        if ( shareWindow.closed == true )
        {
          //Change share count
          $this.changeShareCount( element, callback );
          
          //Clear interval
          clearInterval( interval );
        }
      }, 100 );
      return false;
    });
  }
    
  /**
   * Open share window
   *
   * @var function
   * @param string shareUrl
   * @return void
   */
  construct.prototype.openShareWindow = function( shareUrl )
  {
    var w = window.innerWidth
         || document.documentElement.clientWidth
         || document.body.clientWidth;

    var h = window.innerHeight
         || document.documentElement.clientHeight
         || document.body.clientHeight;
         
    var width  = this.vars.windowWidth,
        height = this.vars.windowHeight,
        left   = (w - width)  / 2,
        top    = (h - height) / 2,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
                
    var shareWindow = window.open(shareUrl, 'social_share', opts);
    return shareWindow;
  }
    
  /**
   * Change share count facebook
   *
   * @var function
   * @param object element
   * @param string pageUrl
   * @return int
   */
  construct.prototype.changeShareCount = function( element, callback )
  {
    var pageUrl = element.getAttribute( 'data-url' );
    
    if ( typeof callback === 'string' )
    {            
      if ( callback == 'facebook' ) {
        this.changeShareCountFacebook( element, pageUrl );
      } else if ( callback == 'twitter' ) {
        this.changeShareCountTwitter( element, pageUrl );
      } else if ( callback == 'googleplus' ) {
        this.changeShareCountGoogleplus( element, pageUrl );
      }
    }
    else if ( typeof callback === 'function' ) {
      callback( pageUrl );
    }
  }
    
  /**
   * Change share count facebook
   *
   * @var function
   * @param object element
   * @param string pageUrl
   * @return int
   */
  construct.prototype.changeShareCountFacebook = function( element, pageUrl )
  {
    var $this = this;
    var count = 0;
        
    //Make request to get facebook share count 
    var requestUrl = 'http://graph.facebook.com/?id=' + pageUrl;
    
    if ( typeof jQuery !== 'undefined' )
    {
      jQuery.ajax({
        type: 'GET',
        url: requestUrl,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) 
        {
          if ( typeof json.shares !== 'undefined' ) {
            count = json.shares;
          }
          
          //Change count
          $this.changeShareCountInfo( element, count );
        },
      });
    }
  }
    
  /**
   * Change share count twitter
   *
   * @var function
   * @param object element
   * @param string pageUrl
   * @return int
   */
  construct.prototype.changeShareCountTwitter = function( element, pageUrl )
  {
    var $this = this;
    var count = 0;
    
    //Make request to get twitter share count 
    var requestUrl = 'http://cdn.api.twitter.com/1/urls/count.json?url=' + pageUrl;
    
    if ( typeof jQuery !== 'undefined' )
    {
      jQuery.ajax({
        type: 'GET',
        url: requestUrl,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) 
        {
          if ( typeof json.count !== 'undefined' ) {
            count = json.count;
          }
          
          //Change count
          $this.changeShareCountInfo( element, count );
        },
      });
    }
  }
    
  /**
   * Change share count googleplus
   *
   * @var function
   * @param object element
   * @param string pageUrl
   * @return int
   */
  construct.prototype.changeShareCountGoogleplus = function( element, pageUrl )
  {
    var $this = this;
    var count = 0;
        
    //Make request to get facebook share count 
    var apikey     = 'AIzaSyCBtrDzN1jp50dir_L4RbOLcecTEh8CNik'; 
    var requestUrl = 'https://clients6.google.com/rpc?key=' + apikey;
    
    if ( typeof jQuery !== 'undefined' )
    {
      jQuery.getJSON( requestUrl, 
        {
          "method":"pos.plusones.get",
          "id":"p",
          "params":{
            "nolog":true,
            "id":pageUrl,
            "source":"widget",
            "userId":"@viewer",
            "groupId":"@self"
          },
          "jsonrpc":"2.0",
          "key":"p",
          "apiVersion":"v1"
        },
        function(data)
        {
          if ( typeof data.count !== 'undefined' ) {
            count = data.count;
          }
          
          //Change count
          $this.changeShareCountInfo( element, count );
        }
      );
    }
  }
    
  /**
   * Change share count info
   *
   * @var function
   * @param object element
   * @param int count
   * @return int
   */
  construct.prototype.changeShareCountInfo = function( element, count )
  {
    var container = element.parentNode;
    var countEl   = container.querySelector( this.vars.countClass );
    countEl.textContent = count;
  }
  
  window.social_share = construct;
})();