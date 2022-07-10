 
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

function RawVideo(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}



function Text(text) {
    this.text = text;
}

var output = [];
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var rawVideo = [];

var emptyKeyValue = [new KeyValue('', '')];

var sour = document.querySelectorAll('p');
for (let a = 0; a < sour.length; a++) {
    if(sour[a].textContent.includes('file:')){
        var content = sour[a].innerHTML;
        link = content.match(/https.+mp4/gm)[0];
        var video = new Video('Normal', new ModuleRequest(link , 'get', emptyKeyValue, null));
        rawVideo.push(new RawVideo([video]));
    } 
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
var chaptersObject = new Chapters('', emptyExtra, new JavascriptConfig(true, false, ''), new Output(new Videos(rawVideo, null), null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;

