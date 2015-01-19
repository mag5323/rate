function ajax(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      callback.apply(xhr);
    }
  }
  xhr.send();
}

ajax('http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm', function() {
  this.responseText.split('\n').forEach(function(p) {
    if (p.indexOf('DownloadCsv') > 0) {
      var datePosition = p.indexOf('date');
      var time = p.substr(datePosition + 5, 19);
    }
  });
});
