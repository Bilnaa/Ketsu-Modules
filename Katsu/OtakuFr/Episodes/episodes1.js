function Header(key, value) {
    this.key = key;
    this.value = value;
}

function ExtraInfo(value) {
    this.value = value;
}

function Output(link, linkIdentifier, moduleID, isDecodable, headers) {
    this.link = link;
    this.linkIdentifier = linkIdentifier;
    this.moduleID = moduleID;
    this.isDecodable = isDecodable;
    this.headers = headers;
}

function EpisodeObject(request, method, headers, extraInfo, loadJavascript, javaScript, output) {
    this.request = request;
    this.method = method;
    this.headers = headers;
    this.extraInfo = extraInfo;
    this.loadJavascript = loadJavascript;
    this.javaScript = javaScript;
    this.output = output;
}
var savedData = document.getElementById('katsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var moduleID = '20';
var headers = [new Header('X-Requested-With', 'XMLHttpRequest')];
var episodeObject;
var output = parsedJson.output;
var extraInfo = parsedJson.extraInfo;
var actualCount = extraInfo[0].value;
var nextCount = parseInt(extraInfo[0].value) + 1;
const script = document.querySelector('script').innerHTML.replace('//', '');
var parser = new DOMParser();
var doc = parser.parseFromString(script, 'text/html');
var videoLink = doc.querySelector('.ui.embed').getAttribute('data-url');
if (!videoLink.includes('https')) {
    output.push(new Output('https:'+link, '', moduleID, 'false', headers));
} else {
    output.push(new Output(videoLink, '', moduleID, 'false', headers));
}
try {
    var nextRequest = extraInfo[nextCount].value;
} catch (e) {
    var nextRequest = '';
}
extraInfo[0].value = '' + (parseInt(actualCount) + 2);
episodeObject = new EpisodeObject(nextRequest, 'get', headers, extraInfo, '', '', output);
var finalJson = JSON.stringify(episodeObject);
savedData.innerHTML = finalJson;