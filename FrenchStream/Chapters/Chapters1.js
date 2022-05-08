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

if (parsedJson.request.url.includes('/film/')) {
    var embedsList = document.querySelector('#primary_nav_wrap > ul').querySelectorAll('li > ul');
    for (embedList of embedsList) {
        var embeds = embedList.querySelectorAll('li>a');
        for (embed of embeds) { output.push(new NeedsResolver('', new ModuleRequest(embed.href, 'get', emptyKeyValue, null))) }
    }
} else {
    var episodeList = document.querySelectorAll('.selink');
    for (episode of episodeList) { try {
        var epName = episode.querySelector('span').textContent.split('pisode')[1].toLowerCase();
        var hash = parsedJson.request.url.split('#')[1].split('-');
        if (epName.includes(hash[0]) && epName.includes(' '+hash[1]+' ') ) {
            var embeds = episode.querySelectorAll('li > a');
            for (embed of embeds) { output.push(new NeedsResolver('', new ModuleRequest(embed.href, 'get', emptyKeyValue, null))) }
        }
    } catch{} }
}

const chaptersPageObject = new Chapters(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output( new Videos(output, null), null, null));

savedData.innerHTML = JSON.stringify(chaptersPageObject);