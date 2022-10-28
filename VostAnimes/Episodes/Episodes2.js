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

function getValueFromKey(keys,key) {
    for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.key == key) {
            return tKey.value;
        }
    } return '';
}

var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML.replaceAll('&amp;', '&').replaceAll('#038;', ''));
const emptyKeyValue = [new KeyValue('', '')];

var output = parsedJson.output.videos;
var extraInfo = parsedJson.extra.extraInfo;
var count = getValueFromKey(extraInfo,'count');
if (count == 0) { output = new Videos([],[]); }

var link = document.querySelector('iframe').src.replace('tape.com','ta.pe');
if (!link.includes('https:')) { link = 'https:'+link; }
output.needsResolver.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null)));

var nextRequest = getValueFromKey(extraInfo,''+count);
extraInfo[1].value = ''+(parseInt(count) +1);

const episodesObject = new Chapters(new ModuleRequest(nextRequest, 'get', [extraInfo[0]], null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output(output, null, null));

savedData.innerText = JSON.stringify(episodesObject);