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

let savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

let image = document.querySelector('.cover-anime').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
let title = document.querySelector('.anime-title-as b').textContent;
let desc = document.querySelector('#shown-trama').textContent.trim();

let genres = Array.from(document.querySelectorAll('.badge-dark')).map(genre => genre.textContent);
let statut = document.querySelector('.w-100.text-white').textContent.split('Stato:')[1].split('\n')[0].trim();
let time = document.querySelector('.w-100.text-white').textContent.split('Durata episodi:')[1].split('\n')[0].trim();

let episodes = Array.from(document.querySelectorAll('.bottone-ep')).map(ep => new Chapter(ep.textContent, new ModuleRequest(ep.href, 'get',emptyKeyValue,null),false));
console.log(episodes);

savedData.innerHTML = JSON.stringify(new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, statut, '', time, 'Eps: '+episodes.length, episodes)));