
    function Info(request, extra, javascriptConfig, output) {
        this.request = request;
        this.extra = extra;
        this.javascriptConfig = javascriptConfig;
        this.output = output;
    }

    function ModuleRequest(url, method, headers, httpBody) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.httpBody = httpBody;
    }

    function Extra(commands, extraInfo) {
        this.commands = commands;
        this.extraInfo = extraInfo;
    }

    function Commands(commandName, params) {
        this.commandName = commandName;
        this.params = params;
    }

    function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
        this.removeJavascript = removeJavascript;
        this.loadInWebView = loadInWebView;
        this.javaScript = javaScript;
    }

    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }

    function Chapter(chapName, link, openInWebView) {
        this.chapName = chapName;
        this.link = link;
        this.openInWebView = openInWebView;
    }

    function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
        this.image = image;
        this.link = link;
        this.title = title;
        this.description = description;
        this.genres = genres;
        this.field1 = field1;
        this.field2 = field2;
        this.field3 = field3;
        this.field4 = field4;
        this.chapters = chapters;
    }

    function getStuff(array, match) {
        for (var x = 0; x < array.length; x++) {
            let data = array[x].innerText;
            if (data.includes(match)) {
                return data.replace(match, '').trim();
            }
        }
    }

    function getFile(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, false);
        xhr.send();
        return xhr.responseText;
    }

    function getHtmlStuff(array, match) {
        for (var x = 0; x < array.length; x++) {
            let data = array[x].innerText;
            if (data.includes(match)) {
                return array[x];
            }
        }
    }
    var savedData = document.getElementById('ketsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);
    let emptyKeyValue = [new KeyValue('referer', 'https://mangas-origines.fr/')];
    var genres = [];
    var sca = [];
    var type = '';
    var desc = document.querySelector('.manga-excerpt p').textContent.trim();

    inf1 = [];
    var dat = '';
    var hum = document.querySelectorAll('.post-status');
    inf1 = hum[0].querySelectorAll('.post-content_item');
    for (let a = 0; a < inf1.length; a++) {
      if(inf1[a].querySelector('.summary-heading h5').textContent.includes('Sortie')){
          dat = inf1[a].querySelector('.summary-content').textContent.trim();
      }
      if(inf1[a].querySelector('.summary-heading h5').textContent.includes('STATUS')){
          var st = inf1[a].querySelector('.summary-content').textContent.trim();
          if(st.includes('En cours')){
              var statu = 'En Cours';
          }else{
              var statu = 'Complete';
          }
      }
    }
    var title = document.querySelector('.container .post-title h1').textContent.trim();
    var image = document.querySelector('.summary_image a img').dataset.src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);

      inf = [];
      var test = document.querySelectorAll('.post-content');
      inf = test[0].querySelectorAll('.post-content_item');
      for (let i = 0; i < inf.length; i++) {
          if(inf[i].querySelector('.summary-heading h5').textContent.includes('Type')){
              var type = inf[i].querySelector('.summary-content').textContent.trim();
          }
          if(inf[i].querySelector('.summary-heading h5').textContent.includes('Genre')){
          genres = Array.from(document.querySelectorAll('.genres-content > a')).map(g => g.textContent.trim());
          }
          
      }
    var content = getFile(window.location.href + 'ajax/chapters');
    var parser = new DOMParser();
    var doc = parser.parseFromString(content, 'text/html');
    var informa = doc.querySelectorAll('ul li');
    for (cr of informa) {
        var link = cr.querySelector('a').href;
        var mo = cr.querySelector('a').textContent.trim();
        let chaip = new Chapter(mo, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
        sca.push(chaip);
    }
    let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('',
        emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title,
        parsedJson.request, desc, genres, dat, type, statu, 'Eps: ' + sca.length, sca.reverse()));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;
