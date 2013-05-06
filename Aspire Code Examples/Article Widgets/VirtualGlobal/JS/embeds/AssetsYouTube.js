/*!
YouTube specific asset functions
 */
//set this so can check if script already loaded
var AssetsYouTubeScript="1";

function getYouTubePlayer(URL, width, height) {
    var YouTubePlayer = '<iframe title="YouTube video player" style="margin:0; padding:0;" width="' + width + '" ';
    YouTubePlayer += 'height="' + height + '" src="' + URL + '" frameborder="0" allowfullscreen></iframe>';
    return YouTubePlayer;
}
     
function setYouTubeTitle(id) {
    var url = "https://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json";
    $.ajax({
        url: url, 
        dataType: 'jsonp', 
        cache: true, 
        success: function(data){
            AssetDialog.dialog({
                title: data.entry.title.$t
            });
        }
    });
}
     
function getYouTubeIdFromUrl(youtubeUrl){
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = youtubeUrl.match(regExp);
    if (match && match[2].length==11){
        return match[2];
    } else {
        return false;
    }
}
function createYouTubeUrl(AssetOptions, assetId)
{
    //Format YouTube URL
                        
    var YouTubeURL = "http://www.youtube.com/embed/" + assetId + "?rel=0&showsearch=0&autohide=" + AssetOptions.autohide;
    YouTubeURL += "&autoplay=" + AssetOptions.autoplay + "&controls=" + AssetOptions.controls + "&fs=" + AssetOptions.fs + "&loop=" + AssetOptions.loop;
    YouTubeURL += "&showinfo=" + AssetOptions.showinfo + "&color=" + AssetOptions.color + "&theme=" + AssetOptions.theme;
    //Setup YouTube Dialog

    var AssetDialogHTML=getYouTubePlayer(YouTubeURL, AssetOptions.width, AssetOptions.height);
    return AssetDialogHTML;
}
//////////for the Popup content
var CreateAssetContent= function(AssetObj,AssetOptions) {
    var assetId = AssetOptions.assetId;
    if ($.trim(assetId) == '' && AssetObj.is("a")) {
        assetId = getYouTubeIdFromUrl(AssetObj.attr("href"));
    }

    if ($.trim(assetId) == '' || assetId === false) {
        assetId = AssetObj.attr(AssetOptions.idAttribute);
    }
    var assetTitle = $.trim(AssetOptions.title);
    if (assetTitle == '') {
        if (AssetOptions.useYouTubeTitle) setYouTubeTitle(assetId);
        else assetTitle = obj.attr('title');
    }
    AssetOptions.title=assetTitle;
    var AssetCode=createYouTubeUrl(AssetOptions, assetId);
    return  AssetCode;
                      
//   ;
}
     
if   ($.fn.AssetPopup)  
{
    $.extend(true, $.fn.AssetPopup.methods, CreateAssetContent);
}
//////////////////////////


function CreateEmbedContent(AssetOptions) {
    var EmbedDefaults ={
         'assetId': '',
        'title': '',
        'useYouTubeTitle': true,
        'idAttribute': 'rel',
        'cssClass': '',
        'modal': false,
        'width': 420,
        'height': 315,
        'hideTitleBar': false,
        'clickOutsideClose': false,
        'autohide': 2,
        'autoplay': 0,
        'color': 'blue',
        'controls': 1,
        'fs': 0,
        'loop': 0,
        'showinfo': 0,
        'theme': 'light',
        'footer': ''
    };
    var AssetURI = AssetOptions.url;
    AssetOptions = $.extend({}, EmbedDefaults, AssetOptions);
    assetId = getYouTubeIdFromUrl(AssetURI);
  
 
    //Format YouTube URL
                        
    var AssetCode=createYouTubeUrl(AssetOptions, assetId);
    return  AssetCode;
                      
//   ;
}



