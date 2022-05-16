function Header(key, value) {
    this.key = key;
    this.value = value;
}

function ExtraInfo(value) {
    this.value = value;
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
    this.episodes = episodes;
}

function Episodes(link, moduleID, isDecodable) {
    this.link = link;
    this.moduleID = moduleID;
    this.isDecodable = isDecodable;
}

function InfoObject(request, method, headers, extraInfo, loadJavascript, javaScript, output) {
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
var headers = [new Header('', '')];
var extraInfo = [new ExtraInfo('')];
var infoObject;
var output;
var episodes = [];
var type = 'empty';
var status = 'Unknown';
var otherinfos = document.querySelectorAll('.list-unstyled li');
for (var i = 0; i < otherinfos.length; i++) {
    let data = otherinfos[i].innerText;
    if (data.includes('Type:')) {
        type = data.replace('Type:', '').trim();
    } else if (data.includes('Statut:')) {
        status = data.replace('Statut:', '').trim();
    }
}
var genres = [];
var desc = '';
var image = '';
var title = '';
var genres = Array.from(document.querySelectorAll('ul > li:nth-child(5) > ul li a')).map(g => g.textContent.trim());
var synopsysdiv = document.querySelectorAll('.episode.fz-sm.synop p');
for (var x = 1; x < synopsysdiv.length; x++) {
    desc = desc + synopsysdiv[x].innerText;
}
var descdiv = document.querySelector('div.depion');
if (descdiv) {
    desc = descdiv.innerText;
}
var image = document.querySelector('figure > img').src;
var title = document.querySelector('figure > img').title;
var chapters = document.querySelectorAll('div.float-right > a');
for (var i = chapters.length - 1; i >= 0; i--) {
    var element = chapters[i];
    var link = element.href;
    var epsObj = new Episodes(link, moduleID, 'false');
    episodes.push(epsObj);
}
output = new Output(moduleID, image, parsedJson.request, title, desc, genres, type, status, episodes);
infoObject = new InfoObject('', 'get', headers, extraInfo, '', '', output);
var finalJson = JSON.stringify(infoObject);
savedData.innerHTML = finalJson;