
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
    let emptyKeyValue = [new KeyValue('', '')];
    var episodes = [];
    var lang = 'ENG';
    var status = 'Unknown';
    var genres = [];
    var desc = document.querySelector('.wp-content').textContent.replaceAll('\\n', '').trim();
    var image = document.querySelector('.poster > img').src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    var title = document.querySelector('.poster > img').alt;
    genres = Array.from(document.querySelectorAll('.sgeneros > a')).map(g => g.textContent.trim());
    if (parsedJson.request.url.includes('tvseries')) {
        type = 'TV Series';
        var donnes = document.querySelectorAll('#seasons > .se-c .se-a .episodios > li');
        for (epi of donnes) {
            var link = epi.querySelector('.episodiotitle > a').href;
            tout = epi.querySelector('.numerando').textContent.replaceAll('\\n', '').trim();
            var sai = `Saison ${tout}`;
            var saison = sai.replace('-', 'Episode').replaceAll('\\n', '');
            var chapitre = new Chapter(saison, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
            episodes.push(chapitre);
        }
    } 
    if (parsedJson.request.url.includes('movies')) {
        type = 'Movies';
        var chapitre = new Chapter(title, new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null),
            false);
        episodes.push(chapitre);
    }
    let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('',
        emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title,
        parsedJson.request, desc, genres, status, type, lang, 'Eps: ' + episodes.length, episodes));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;
