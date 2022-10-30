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
function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
	this.videoLink = videoLink;
}
function RawVideo(video) { this.video = video; }
   
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

let link = JSON.parse(document.querySelector('script').innerHTML.replace('/*', '').replace('*/', ''))['grabber'].replace('streamtape.com', 'streamta.pe');

if (link.includes('DLL/ANIME') || link.includes('DDL/ANIME')) {
    output.rawVideo.push(new RawVideo([new Video('Normal', new ModuleRequest(link, 'get', emptyKeyValue, null))]));
} else if(link.includes('animeworld.biz')) {
    output.needsResolver.push(new NeedsResolver('WATCHSB_BROKEN', new ModuleRequest(link, 'get', emptyKeyValue, null)));
} else{ output.needsResolver.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null))) }

var nextRequest = getValueFromKey(extraInfo,''+count);
extraInfo[0].value = ''+(parseInt(count) +1);

const episodesPageObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output( output, null,null));

savedData.innerHTML = JSON.stringify(episodesPageObject);