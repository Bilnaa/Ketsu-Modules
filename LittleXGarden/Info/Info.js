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

    function Chapter(chapName, link,openInWebView) {
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

    function getStuff(array,match) {
            for (var x = 0 ; x< array.length;x++) {
                let data = array[x].innerText;
                if (data.includes(match)) {
                    return data.replace(match,'').trim();
                } 
            }
        }
    function getHtmlStuff(array,match) {
        for (var x = 0 ; x< array.length;x++) {
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
    var type = 'Manga';
    var status = '';
    var genres = [];
    var desc = '';
    var title = document.querySelector('.super-title > span').innerText.trim();

    var chapters = document.querySelectorAll('.col-md-6 > .mb-3 > a');
    var chapTri = [];
    for (chapitres of chapters) {
        chapTri.push(chapitres);
    }
    chapTri.reverse();
    for (chaps of chapTri) {
        var allChaps = chaps.href.split('/')[2];
    }

    var imgRand = Math.floor(Math.random()*chapTri.length);
    var image = chapTri[imgRand].querySelector('.item-wrapper > .item').innerHTML.split('(')[1].split(')')[0];
    image = new ModuleRequest(image,'get',emptyKeyValue,null);

    for (var x = 0; x < allChaps; x++) {
        var link = parsedJson.request.url + '/' + (x + 1) + '/1';
        episodes.push(new Chapter('Chapitre : ' + (x + 1), new ModuleRequest(link, 'get', emptyKeyValue, null), false));
    }    

    let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, '', type, 'Chap: '  + episodes.length, episodes));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;