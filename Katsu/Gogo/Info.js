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
var moduleID = '2';
var infoObject;
var output;
var headers = [];
var extraInfo = [];
var episodes = [];
var type = ' ';
var status = '';
var genres = [];
var desc = '';
var parsedJson = JSON.parse(savedData.innerHTML);
var animeInfo = document.querySelector('.anime_info_body');
var title = animeInfo.querySelector('h1').innerText;
var image = animeInfo.querySelector('img').src;
var forData = document.querySelectorAll('.type');
for (var x = 0; x < forData.length; x++) {
    var text = '' + forData[x].innerText;
    if (text.includes('Type:')) {
        type = text.replace('Type:').replace('undefined', '');
    }
    if (text.includes('Genre:')) {
        var gen = forData[x].querySelectorAll('a');
        for (var y = 0; y < gen.length; y++) {
            genres.push(gen[y].innerText.replace(',', ''));
        }
    }
    if (text.includes('Plot Summary:')) {
        desc = text.replace('Plot Summary:').replace('undefined', '');
    }
    if (text.includes('Status:')) {
        status = text.replace('Status:', '');
    }
}
var chapters = document.querySelector('.active').getAttribute('ep_end');

let anime_id = document.querySelector('.anime_info_episodes_next > input').getAttribute('value');
let respUrl = 'https://' + parsedJson.responseInfo.responseUrl.split('/')[2];
let extraInfo = [new ExtraInfo(respUrl)];

output = new Output(moduleID, image, parsedJson.request, title, desc, genres, type, status, episodes);
headers.push(new Header('', ''));
infoObject = new InfoObject('https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end='+chapters+'&id='+anime_id, 'get', headers, extraInfo, '', '', output);
var finalJson = JSON.stringify(infoObject);
savedData.innerHTML = finalJson;