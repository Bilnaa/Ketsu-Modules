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
    
function Videos(needsResolver, rawVideo) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}
  
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('Referer','https://vostanimes.tv/')];

var extraInfo = [new KeyValue('count','0')];

const httpBody = document.querySelector('.TPlayerTb').innerHTML.split('trid=')[1].split('&')[0];
extraInfo.push(new KeyValue('httpBody',httpBody));

var embedList = document.querySelector('.TPlayer').querySelectorAll('.TPlayerTb');    
for (var x = 0; x < embedList.length; x++) {
    var link = embedList[x].innerHTML.split('src=\"')[1].split('\"')[0].replaceAll('&amp;', '&').replaceAll('#038;', '');
    if (x == 0) { var nextRequest = link; }
    else { extraInfo.push(new KeyValue(''+(x-1), link)); }
}

const episodesObject = new Chapters(new ModuleRequest(nextRequest, 'post', emptyKeyValue, httpBody), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output(new Videos([], []), null, null));
console.log(episodesObject);

savedData.innerHTML = JSON.stringify(episodesObject);