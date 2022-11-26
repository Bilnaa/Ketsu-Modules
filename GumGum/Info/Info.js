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

function infoFilter(filter) { return document.querySelector('.entry-content').innerHTML.split(filter)[1].split('span> ')[1].split('<br')[0] }

var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

let image = document.querySelector('nop > .alignright').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
let title = document.querySelector('h1').textContent;
let desc = document.querySelector('h5').textContent;
let genres = infoFilter('Genre:').split(', ');
let statut = infoFilter('Statut:');
let type = infoFilter('Type:');

let episodes = Array.from(document.querySelectorAll('.entry-content a')).map(
    ep => new Chapter(ep.textContent, new ModuleRequest(ep.href, 'get', emptyKeyValue, null), false)
);

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, statut, '', type, 'Eps: '+ episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);