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

function getValueFromKey(keys, key) {
    for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.key == key) {
            return tKey.value;
        }
    }
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
var extraInfo = [new KeyValue('', '')];
var episodes = [];
if (!document.querySelector('head> title').innerText.includes('Serie')) {
    var type = '';
    var status = '';
    var genres = [];
    var desc = document.querySelector('.fimm').innerText.trim();
    var title = document.querySelector('#poster a img').alt;
    var image = 'https:' + document.querySelector('#poster a img').src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    let chapter = new Chapter(title, new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null), false);
    type = 'Film';
    episodes.push(chapter);
    var newRequest = '';
} else {
    type = 'Serie';
    var genres = [];
    try {
        genres = Array.from(document.querySelector('.date').innerText.split('|')[1].split(','));
    } catch {}
    var desc = document.querySelector('.marl p').textContent.trim();
    var title = document.querySelector('.imrl a img').alt;
    var image = document.querySelector('.imrl a img').src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    var chapters = document.querySelectorAll('#seon .seho');
    for (var i = 0; i < chapters.length; i++) {
        var element = chapters[i];
        var fixedLink = 'https://goojara.to' + element.querySelector('h1 a').href;
        var episodeName = element.querySelector('div.seep').innerText.trim().replace('\\n', ' -') + ' - ' + element.querySelector('h1 a').innerText.trim();
        let chapter = new Chapter(episodeName, new ModuleRequest(fixedLink, 'get', emptyKeyValue, null), false);
        episodes.push(chapter);
    }
    if (document.querySelectorAll('.dflex button').length > 2) {
        var extraInfo = [new KeyValue('count', '0')];
        var seasons = document.querySelectorAll('.dflex button').length - 1;
        for (var x = seasons.length - 1; x >= 1; x--) {
            if (x == 1) {
                var newRequest = `${parsedJson.request.url + `?s=${x}`}`;
            } else {
                extraInfo.push(new KeyValue(`${x-1}`, `${parsedJson.request.url + `?s=${x}`}`));
            }
        }
    }
}
let infoPageObject = new Info(new ModuleRequest(newRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, '', type, 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;