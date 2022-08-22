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
function NeedsResolver(resolverIdentifier, link) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}
    
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

var output = [];

for (embed of document.querySelectorAll('.protected-info')) { embed.click() }
for (iframe of document.querySelectorAll('iframe')) {
    output.push(new NeedsResolver('', new ModuleRequest(iframe.src.replace('tape.com', 'ta.pe'), 'get', emptyKeyValue, null)));
}
for (redirection of document.querySelectorAll('.lecteur-redirection')) {
    output.push(new NeedsResolver('', new ModuleRequest(redirection.href, 'get', emptyKeyValue, null)));
}

const emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
const chaptersPageObject = new Chapters(new ModuleRequest('', '', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output( new Videos(output, null), null, null));

savedData.innerHTML = JSON.stringify(chaptersPageObject);