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

const type = parsedJson.request.url.includes('.io') ? 'Film':'Serie';

var img = parsedJson.request.url.split('/titles')[0].split('/serie')[0] + document.querySelector('.title-wrap').style.backgroundImage.split('\"')[1];
img = new ModuleRequest(img,'get',emptyKeyValue,null);
var title = document.querySelector('h1.title').textContent;
var desc = document.querySelector('.plot').textContent.trim();

var genres = document.querySelector('.category').textContent.trim().split(' ');
var year = document.querySelector('.info-span > .desc').textContent.split(' -')[0].split(': ').slice(-1)[0];
var time = document.querySelector('.info-span').querySelectorAll('.desc')[1].textContent.split(': ').slice(-1)[0];

var episodes = [];
if (type == 'Film') {
    var link = document.querySelector('.play-hitzone').href;
    episodes.push(new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false));
} else {
    for (let ep of document.querySelectorAll('.slider-tile')) {
        episodes.push(new Chapter(ep.title, new ModuleRequest(`${parsedJson.request.url}?ep=${encodeURI(ep.title)}`, 'get', emptyKeyValue, null), false));
    }
}

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(img, title, parsedJson.request, desc, genres, year, time, type, 'Eps: '+ episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);