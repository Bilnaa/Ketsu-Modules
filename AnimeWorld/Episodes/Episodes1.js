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
    
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

var extraInfo = [new KeyValue('count','0')];
var nextRequest = '';
var output = [];
var raw = [];

const epId = parsedJson.request.url.split('#')[1];
var x = 0;
for (server of document.querySelectorAll(`a[data-episode-id=\"${epId}\"]`)) {
    let link = `${parsedJson.request.url.split('/play')[0]}/api/episode/info?id=${server.getAttribute('data-id')}`;
    if (x == 0) { nextRequest = link; }
    else { extraInfo.push(new KeyValue(''+(x-1), link)); }
    x++;
}

for (download of document.querySelectorAll('.widget.downloads a')) {
    let dLink = download.href.replace('streamtape.com', 'streamta.pe');
    if (dLink.includes('DLL/ANIME') || dLink.includes('DDL/ANIME')) {
        raw.push(new RawVideo([new Video('Normal', new ModuleRequest(dLink.replace('download-file.php?id=', ''), 'get', emptyKeyValue, null))]));
    } else if(dLink.includes('animeworld.biz')) {
        output.push(new NeedsResolver('WATCHSB_BROKEN', new ModuleRequest(dLink, 'get', emptyKeyValue, null)));
    } else{ output.push(new NeedsResolver('', new ModuleRequest(dLink, 'get', emptyKeyValue, null))) }
}

const episodesPageObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(true, false, ''), new Output( new Videos(output, raw), null,null));

savedData.innerHTML = JSON.stringify(episodesPageObject);