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
var moduleID = '114653268923213246';
var headers = [new Header('', '')];
var episodeObject;
var output = parsedJson.output;
var extraInfo = parsedJson.extraInfo;
const script = document.querySelector('script').innerHTML.replace('//', '');
const data = JSON.parse(script);
const link = data.link;
var actualCount = extraInfo[0].value;
var nextCount = parseInt(extraInfo[0].value) + 1;
if (!link.includes('rapid-cloud')) {
    if (link.includes('streamtape.com')) {
        output.push(new Output(link.replace('https://streamtape.com/', 'https://streamta.pe/'), '', moduleID, 'false', headers));
    }else{
        output.push(new Output(link, '', moduleID, 'false', headers));
    }
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