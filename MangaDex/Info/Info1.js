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
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerText);
let emptyKeyValue = [new KeyValue('', '')];
var image = parsedJson.output.image;
var title = parsedJson.output.title;
var desc = parsedJson.output.description;
var genres = parsedJson.output.genres;
var type = parsedJson.output.field3;
var episodes = [];
var script = document.querySelector('script').innerText.replace('*/', '').replace('/*', '');
var json = JSON.parse(script);
for (chapter of json.data) {
    var volume = 'Volume ' + chapter.attributes.volume + ' ';
    if (volume == 'Volume ' + null + ' ') {
        volume = '';
    }
    try {
        var chapter1 = 'Chapter ' + chapter.attributes.chapter;
        if (chapter1 == 'Chapter ' + null) {
            chapter1 = 'Chapter ??';
        }
    } catch (e) {
        var chapter1 = '';
    }
    var chapterName = volume + '' + chapter1;
    var link = 'https://api.mangadex.org/at-home/server/' + chapter.id;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    let finalData = new Chapter(chapterName, link, false);
    episodes.push(finalData);
}
parsedJson.request.url = parsedJson.output.link.url;
if (episodes.length == 0) {
    let finalData = new Chapter('NO ENGLISH CHAPTERS AVAILABLE', new ModuleRequest(parsedJson.request.url
        .replace('api.', ''), 'get', emptyKeyValue, null), true);
    episodes.push(finalData);
}
let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('',
    emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title,
    parsedJson.request, desc, genres, status, 'Manga', type, 'Chapters : ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;