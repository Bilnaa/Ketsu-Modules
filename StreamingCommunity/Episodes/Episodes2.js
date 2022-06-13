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
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyKeyValue = [new KeyValue('', '')];

var output = parsedJson.output.videos.needsResolver;
var embeds = document.querySelectorAll('._player-mirrors li');
for (let embed of embeds) {
    var link = embed.getAttribute('data-link').replace('tape.com', 'ta.pe');
    if (!link.includes('https:')) { link = 'https:' + link; }
    output.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null)));
}

const episodesPageObject = new Chapters(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output( new Videos(output, null), null, null));

savedData.innerHTML = JSON.stringify(episodesPageObject);