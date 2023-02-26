document.addEventListener('DOMContentLoaded', function (e) {

    {
        var audios = document.getElementsByTagName('audio');
        for (var i = 0, len = audios.length; i < len;i++) {
            var a = audios[i];
            a.volume = 0.5;
        }
    }

    document.addEventListener('play', function (e) {
        var audios = document.getElementsByTagName('audio');
        for (var i = 0, len = audios.length; i < len;i++) {
            var a = audios[i];
            if (a == e.target) continue;
            a.pause();
            a.currentTime = 0;
        }
    }, true);

    document.addEventListener('volumechange', function(e) {
        var audios = document.getElementsByTagName('audio');
        for (var i = 0, len = audios.length; i < len;i++) {
            var a = audios[i];
            if (a == e.target) continue;
            a.volume = e.target.volume;
            a.muted = e.target.muted;
        }
    }, true);

}, true);
