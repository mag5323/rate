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

      ajax('http://rate.bot.com.tw/Pages/UIP003/Download.ashx?lang=zh-TW&fileType=1&date=' + time, function() {
        var currencies = {};
        var rates = this.responseText.split('\n');
        var len = rates.length;
        var i;

        for (i = 1; i < len - 1; i++) {
          var row = rates[i].split(',');

          row = row.map(function(column) {
            return column.trim();
          });

          var currency = {};
          currency.cashBuy = row[2];
          currency.cashSale = row[12];
          currency.spotBuy = row[3];
          currency.spotSale = row[13];

          currencies[row[0]] = currency;
        };

        var tr = document.createElement('tr');
        for (prop in currencies.JPY) {
          var td = tr.appendChild(document.createElement('td'));
          td.innerHTML = currencies.JPY[prop];
        }

        document.getElementsByTagName('tbody')[0].appendChild(tr);
        document.getElementById('update-time').innerHTML = time.split('T').join('\t');
      });
    }
  });
});
