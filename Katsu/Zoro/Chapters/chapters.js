function Header(key,value) {
    this.key = key;
    this.value = value;
}

function ExtraInfo(value) {
    this.value = value;
}

function Output(link,linkIdentifier,moduleID,isDecodable,headers) {
    this.link = link;
    this.linkIdentifier = linkIdentifier;
    this.moduleID = moduleID;
    this.isDecodable = isDecodable;
    this.headers = headers;
}

function EpisodeObject(request,method,headers,extraInfo,loadJavascript,javaScript,output) {
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
var headers = [new Header('','')]; 
var episodeObject; 
var output = [];
const script = document.querySelector('script').innerHTML.replace('//','');
const data = JSON.parse(script);
const html = data.html;
const htmlObject = document.createElement('div');
htmlObject.innerHTML = html;
document.body.appendChild(htmlObject);
var extraInfo = [new ExtraInfo('0')];

var links = document.querySelectorAll('.item.server-item');
for (var x = 0; x < links.length; x++) {
    var link = links[x];
    var id = link.dataset.id;
    var lang = link.dataset.type;
    var url = 'https://zoro.to/ajax/v2/episode/sources?id=' + id + '?lang=' + lang;
    if (x == 0) {
        var nextRequest = url
    } else {
        extraInfo.push(new ExtraInfo(`${url}`));
    }
    console.log(url);
}

episodeObject = new EpisodeObject(nextRequest,'get',headers,extraInfo,'','',output);
var finalJson = JSON.stringify(episodeObject);
savedData.innerHTML = finalJson;