$(document).ready(function() {
  var originalTitle = document.title;

  // Titre des liens sur les timestamp des playlists
  $('a.mejs-smartplaylist-time').attr('title', 'Écouter ce morceau');

  // Configuration du player audio
  $('audio').mediaelementplayer(
    {
      // Enabled features
      features: ['playpause', 'progress', 'current', 'duration', 'tracks', 'smartplaylist', 'googleanalytics', 'autochange'],

      // Player size
      audioWidth: '100%',

      // Smart playlists configuration
      smartplaylistLinkTitle: 'Écouter ce morceau',
      smartplaylistPositionQueryVar: 'position',
      smartplaylistPageTitleFormat:    '%timecode% | %title% | ' + originalTitle,
      smartplaylistPageTitleCallback:  function(currentTrack) {
        var match = currentTrack.parent().text().match(/\d{2}:\d{2}:\d{2} (.*)/);
        if (match != null) {
          var trackTitle = match[1];
          trackTitle = trackTitle.replace(/\| /, '');
        }
        if (trackTitle == undefined) {
          return false;
        } else {
          return trackTitle;
        }
      },

      // Download link
      ouiedireDownloadUrl: window.MejsOuiedireDownloadUrl,

      // Google Analytics integration
      googleAnalyticsTitle: 'Ouïedire.net',
      googleAnalyticsCategory: 'Émissions',

      // Autochange configuration
      autochangeSelectorNextLink: 'a.previous',
      autochangeQueryString: 'play',

      success: function(mediaElement) {
        // Autoplay
        if (window.MejsAutoplay) {
          mediaElement.play();
        }
      }
    }
  );

});
