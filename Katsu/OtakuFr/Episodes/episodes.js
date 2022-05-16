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
var output = [];
var nextRequest = '';
var extraInfo = [new ExtraInfo('1')];
var links = document.querySelectorAll('iframe');
for (var x = 0; x < links.length; x++) {
    var link = links[x].src;
    if (link.includes('https:')) {
        output.push(new Output(link, '', moduleID, 'false', headers))
    }
}
var count = 1;
for (var y = 0; y < links.length; y++) {
    var link = links[y];
    if (link.src.includes('parisanime.com')) {
        var url = 'https:' + link.src;
        if (x == 0) {
            nextRequest = url;
        } else {
            extraInfo.push(new ExtraInfo(`${url}`));
            count++;
        }
        console.log(url);
    }
}
if (extraInfo.length >= 2) {
    nextRequest = extraInfo[1].value;
}
episodeObject = new EpisodeObject(nextRequest, 'get', headers, extraInfo, '', '', output);
var finalJson = JSON.stringify(episodeObject);
savedData.innerHTML = finalJson;