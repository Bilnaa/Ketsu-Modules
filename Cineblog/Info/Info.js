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

let image = parsedJson.request.url.split('/cb01')[0] + document.querySelector('.story-cover > img').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
let title = document.querySelector('[property=\"og:title').content;
let desc = document.querySelector('[itemprop=depion').content;

let genres = Array.from(document.querySelector('.text-uppercase').textContent.split('–')[0].split('/')).map(genre => genre.trim());

let time = document.querySelector('.text-uppercase').textContent.split('–')[1].trim();

if (document.querySelectorAll('.videobox-tabs a').length > 1) { var link = parsedJson.request.url; }
else { var link = document.querySelector('.tab-pane.fade > p').getAttribute('src').replace('ddl', 'movie'); }
let movie = [new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false)];

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, time, 'Movie', '', '', movie));

savedData.innerHTML = JSON.stringify(infoPageObject);