function Header(key, value) {
    this.key = key;
    this.value = value;
}

function ExtraInfo(value) {
    this.value = value;
}

function Output(lastEpisodes, lastAnimes) {
    this.lastEpisodes = lastEpisodes;
    this.lastAnimes = lastAnimes;
}

function LastAnimes(moduleID, image, link, title) {
    this.moduleID = moduleID;
    this.image = image;
    this.link = link;
    this.title = title;
}

function LastEpisodes(moduleID, image, link, title, episode) {
    this.moduleID = moduleID;
    this.image = image;
    this.link = link;
    this.title = title;
    this.episode = episode;
}

function MainPageObject(request, headers, method, extraInfo, loadJavascript, javaScript, output) {
    this.request = request;
    this.headers = headers;
    this.method = method;
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
var mainPageObject;
var output;
var lastAnimes = [];
var lastEpisodes = [];
var episodes = document.querySelectorAll('.col-md-8.order-1 .episode');
for (var x = 0; x < episodes.length; x++) {
    var episode = episodes[x];
    var title = episode.querySelector('figure img').title;
    var image = episode.querySelector('figure > a > img').src;
    var ep = title.match(/[0-9]+.+./gm)[0];
    title = title.replace(ep, '');
    var link = episode.querySelector('a').href;
    var episodeObject = new LastEpisodes(moduleID, image, link, title, ep);
    lastEpisodes.push(episodeObject);
}
var animes = document.querySelectorAll('.list-group .list-group-item.list-group-item-action');
for (var x = 0; x < animes.length; x++) {
    var anime = animes[x];
    var title = anime.querySelector('figure img').title;
    var image = anime.querySelector('figure > img').src;;
    var link = anime.href;
    var animeObject = new LastAnimes(moduleID, image, link, title);
    lastAnimes.push(animeObject);
}
while (lastEpisodes.length % 2 != 0) {
    lastEpisodes.push(lastEpisodes[0]);
}
while (lastAnimes.length % 3 != 0) {
    lastAnimes.push(lastAnimes[0]);
}
output = new Output(lastEpisodes, lastAnimes);
mainPageObject = new MainPageObject('', headers, '', extraInfo, '', '', output);
var finalJson = JSON.stringify(mainPageObject);
savedData.innerHTML = finalJson;