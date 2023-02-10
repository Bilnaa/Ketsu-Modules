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
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

var output = parsedJson.output.videos;
var extraInfo = parsedJson.extra.extraInfo;
var count = getValueFromKey(extraInfo,'count');
if (count == 0) { output = new Videos([],[]); }

if (parsedJson.request.url.includes('frenchstream')) {
    let link = document.querySelector('iframe').src;
    if (!link.split('php')[0].includes('https:')) { link = 'https:'+link; }
    extraInfo.push(new KeyValue(''+(extraInfo.length-2), encodeURI(link)));
} else if (parsedJson.request.url.includes('play.php')) {
    for (script of document.querySelectorAll('script')) {
        if (script.innerHTML.includes('eval(function')) {
            var newScript = document.createElement('script');
            newScript.innerHTML = script.innerHTML.replace('return p', 'document.title = p; return p');
            document.body.appendChild(newScript);
            break;
        }
    }
    let link = parsedJson.request.url.split('play')[0] + document.title.split('src')[1].split('\"')[1];
    extraInfo.push(new KeyValue(''+(extraInfo.length-2), encodeURI(link)));
} else if (parsedJson.request.url.includes('playback.php')) {
    let link = parsedJson.request.url.split('/play')[0] + document.querySelector('iframe').src;
    extraInfo.push(new KeyValue(''+(extraInfo.length-2), encodeURI(link)));
} else {
    try {
        let link = document.querySelector('[property=\"og:url\"]').content;
        output.needsResolver.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null)));
    } catch{}
}

var nextRequest = getValueFromKey(extraInfo,''+count);
if (nextRequest.includes('play.php')) { var noJS = false }
else { var noJS = true}
extraInfo[1].value = ''+(parseInt(count) +1);

const episodesPageObject = new Chapters(new ModuleRequest(nextRequest, 'get', [extraInfo[0]], null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(noJS, false, ''), new Output( output, null, null));

savedData.innerHTML = JSON.stringify(episodesPageObject);