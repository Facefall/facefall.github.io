document.addEventListener('DOMContentLoaded', function (){
  'use strict';
  var randomSong;
  var playlistUrl = `http://47.101.33.84:3000/playlist/detail?id=4897254242`;
  fetch(playlistUrl).
  then(function (response){
    return  response.json();
  }).
  then(response => {
    var getRandomSongUrl = function (){
        var playlist = response["playlist"]["tracks"];
        var len = playlist.length;
        var randomIndex = Math.floor( Math.random() * len);
        randomSong = playlist[randomIndex];
        var randomId = randomSong["id"];
        return `http://47.101.33.84:3000/song/url?id=${randomId}`;
    }
    var songUrl = getRandomSongUrl()
    fetch(songUrl).
    then(function (response){
      return response.json();
    }).
    then(function (songData){
      if(songData["code"] === 200 || songData["code"] === 304){
        songData = songData["data"][0];
        var musicUrl = songData["url"];
        var picUrl = randomSong["al"]["picUrl"];
        var audio = document.createElement("AUDIO");

        var musicBox = document.querySelector("#music-box");

        var musicPic = document.querySelector("#music-pic");



        audio.setAttribute("src", musicUrl);
        musicPic.setAttribute("src", picUrl);

        musicBox.style.cssText = `left:0;`;// start: right:-80px  end: right:0px
        musicBox.addEventListener("click", (e) => {
          if(audio.paused){
            //    暂停中
            audio.play();
          }
          else{
            audio.pause();
          }
        })

      }
      else{
        console.log("背景音乐获取失败! http code ", songData["code"]);
        return false;
      }
    })

  })
})


