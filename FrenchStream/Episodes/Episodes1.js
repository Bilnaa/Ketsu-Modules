function Chapters(request, extra, javascriptConfig, output) {
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
function Output( videos, images, text) {
    this.videos = videos;
    this.images = images;
    this.text = text;
}
    
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const refererKeyValue = [new KeyValue('Referer', parsedJson.request.url.split('#')[0])];
    
var extraInfo = [refererKeyValue[0], new KeyValue('count','0')];

if (parsedJson.request.url.includes('film')) { var element = '.fx-row'; }
else { var element = '#'+parsedJson.request.url.split('#')[1]; }

var i = 0;
for (player of document.querySelector(element).querySelectorAll('a')) {
    let link = parsedJson.request.url.split('/french-stream')[0] + player.getAttribute('onclick').split('\'')[1];
    if (i == 0) { var nextRequest = link; }
    else { extraInfo.push(new KeyValue(''+(i-1), link)); }
    i++;
}

const episodesPageObject = new Chapters(new ModuleRequest(nextRequest, 'get', refererKeyValue, null), new Extra([new Commands('', refererKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output( null, null, null));

savedData.innerHTML = JSON.stringify(episodesPageObject);