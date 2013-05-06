/*!
 functions for asset modals/popups
 */
//set this so can check if script already loaded
var AssetsModalScript="1";
   
(function ($) {
    var AssetDialog = null;
  
    var methods = {
        //initialize plugin
        init: function (options) {
            options = $.extend({}, $.fn.AssetPopup.defaults, options);
             $.fn.AssetPopup.options = options;


            // initialize Asset Dialog
            if (AssetDialog == null) {
                AssetDialog = $('<div id="AssetDialog">').css({ display: 'none', padding: 0 });
                if(options.cssClass != '') AssetDialog.addClass(options.cssClass);
                $('body').append(AssetDialog);
                AssetDialog.dialog({ autoOpen: false, resizable: false, draggable: options.draggable, modal: options.modal,
                    close: function () {
                        AssetDialog.html('');
                        $(".ui-dialog-titlebar").show();
                    }
                });
            }
 
            return this.each(function () {
                var obj = $(this);
                var data = obj.data('Asset');

                    var AssetDialogContent =CreateAssetContent(obj,  $.fn.AssetPopup.options);

                if (!data) { //check if event is already assigned
                    obj.data('Asset', { target: obj, 'active': true });
                    $(obj).bind('click.AssetPopup', function () {
                         AssetDialog.html(AssetDialogContent);

                        AssetDialog.append(options.footer); //dfm: added custom footer
                        AssetDialog.dialog({ 'width': 'auto', 'height': 'auto' }); //reset width and height
                        AssetDialog.dialog({ 'minWidth': options.width, 'minHeight': options.height, title: options.title });
                        AssetDialog.dialog({ buttons: [
                    {text: "Close", click: function() {$(this).dialog("close")}}
                ]}); //dfm: added close button
                        AssetDialog.dialog('open');
                        $(".ui-widget-overlay").fadeTo('fast', options.overlayOpacity); //set Overlay opacity
                        if(options.hideTitleBar && options.modal){ //hide Title Bar (only if Modal is enabled)
                            $(".ui-dialog-titlebar").hide(); //hide Title Bar
                            $(".ui-widget-overlay").click(function () { AssetDialog.dialog("close"); }); //automatically assign Click event to overlay
                        }
                        if(options.clickOutsideClose && options.modal){ //assign clickOutsideClose event only if Modal option is enabled
                            $(".ui-widget-overlay").click(function () { AssetDialog.dialog("close"); }); //assign Click event to overlay
                        }
                        return false;
                    });
                }
            });
        },
        destroy: function () {
            return this.each(function () {
                $(this).unbind(".AssetPopup");
                $(this).removeData('Asset');
            });
        }
    };

 
    $.fn.AssetPopup = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.AssetPopup');
        }
    };

    //default configuration
    $.fn.AssetPopup.defaults = {
        'assetId': '',
        'title': '',
        'useYouTubeTitle': true,
        'idAttribute': 'rel',
        'cssClass': '',
        'draggable': false,
        'modal': true,
        'width': 640,
        'height': 480,
        'hideTitleBar': false,
        'clickOutsideClose': false,
        'overlayOpacity': 0.5,
        'autohide': 2,
        'autoplay': 0,
        'color': 'red',
        'controls': 1,
        'fs': 1,
        'loop': 0,
        'showinfo': 0,
        'theme': 'light',
        'footer': ''
    };
    


 $.fn.AssetPopup.methods = methods;

})(jQuery);



