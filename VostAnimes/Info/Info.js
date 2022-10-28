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

var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

var image = document.querySelector('.Image img').src;
if (!image.includes('https:')) { image = 'https:'+image; }
image = new ModuleRequest(image,'get',emptyKeyValue,null);
var title = document.querySelector('title').textContent.split(' Anime en')[0];
var desc = document.querySelector('.Depion').textContent.split('(function')[0].trim();

var genres = [];
try { genres = Array.from(document.querySelectorAll('a[rel=\"category tag')).map(g => g.textContent); } catch{}

var time = '';
try { time = document.querySelector('.Time').textContent; } catch{}
var year = '';
try { year = document.querySelector('.Date').textContent; } catch{}

var episodes = [];
var type ='Anime';
if (parsedJson.request.url.includes('film')) {
    type = 'Film';
    episodes.push(new Chapter(title, new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null), false));
} else {
    for (saison of document.querySelectorAll('.Wdgt.AABox')) {
        var nbSaison = Array.from(saison.querySelector('.Title').textContent.split(' ')).map(s => s.trim()).join(' ').replaceAll('  ', '');
        for (episode of saison.querySelectorAll('tr')) {
            var nbEp = episode.querySelector('.Num').textContent;
            var epLink = episode.querySelector('a').href;
            episodes.push(new Chapter(nbSaison+' Épisode '+nbEp, new ModuleRequest(epLink, 'get', emptyKeyValue, null), false));
        }
    }
}
const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, time, year, type, 'Eps: '+ episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);