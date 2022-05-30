function Header(key, value) {
    this.key = key;
    this.value = value
}

function ExtraInfo(value) {
    this.value = value
}

function Output(moduleID, image, link, title, description, genres, type, status, episodes) {
    this.moduleID = moduleID;
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.type = type;
    this.status = status;
    this.episodes = episodes
}

function Episodes(link, moduleID, isDecodable) {
    this.link = link;
    this.moduleID = moduleID;
    this.isDecodable = isDecodable
}

function InfoObject(request, method, headers, extraInfo, loadJavascript, javaScript, output) {
    this.request = request;
    this.method = method;
    this.headers = headers;
    this.extraInfo = extraInfo;
    this.loadJavascript = loadJavascript;
    this.javaScript = javaScript;
    this.output = output
}
var savedData = document.getElementById('katsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var moduleID = '2';
var infoObject;
var output;
var headers = [];
var title = parsedJson.output.title;
var extraInfo = parsedJson.extraInfo;
var episodes = [];
var type = parsedJson.output.type;
var status = parsedJson.output.status;
var image = parsedJson.output.image;
var genres = parsedJson.output.genres;
var desc = parsedJson.output.description;
document.write(document.querySelector('script').innerHTML.replace('/*', '').replace('//', ''));
let episodesdiv = document.querySelectorAll('#episode_related > li');
let domainURL = new URL(parsedJson.extraInfo[0].value);
for (var x = 0; x < episodesdiv.length; x++) {
    let episode = episodesdiv[x];
    let link = domainURL.origin + episode.querySelector('a').getAttribute('href').replace(' /', '/');
    link = link.trim();
    episodes.push(new Episodes(link, moduleID, 'false'));
}
episodes.reverse();
parsedJson.request = parsedJson.output.link;
output = new Output(moduleID, image, parsedJson.request, title, desc, genres, type, status, episodes);
infoObject = new InfoObject('', 'get', headers, extraInfo, '', '', output);
var finalJson = JSON.stringify(infoObject);
savedData.innerHTML = finalJson;