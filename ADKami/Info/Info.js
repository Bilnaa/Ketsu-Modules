function Info(request, extra, javascriptConfig, output) {
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
function Chapter(chapName, link,openInWebView) {
    this.chapName = chapName;
    this.link = link;
    this.openInWebView = openInWebView;
}
function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.chapters = chapters;
}

var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML);
const emptyKeyValue = [new KeyValue('', '')];

var image = document.querySelector('.col-12.m-hidden').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
var title = document.querySelectorAll('[itemprop=\"name\"]')[1].textContent;
var desc = document.querySelector('.depion').textContent.trim();
var genres = Array.from(document.querySelectorAll('.info [itemprop=\"genre\"]')).map(genre => genre.textContent);

const infos = document.querySelectorAll('.anime-information-icon > span');
var statut = infos[2].title;
var type = infos[1].title;

var episodes = [];
var eps = {};
var seasons = document.querySelectorAll('.saison-container');
const isSeason0 = seasons.length < 1;
if (isSeason0) { seasons = document.querySelectorAll('#nav-episode ul'); }

for (let season of seasons) {
    if (season.querySelectorAll('ul').length > 1 || isSeason0) {
        var seasonName = season.querySelector('.saison').textContent;
        for (let epi of season.querySelectorAll('a')) {
            var lang = epi.textContent.split(' ').slice(-1);
            var ep = new Chapter(`${epi.textContent} ${seasonName}`, new ModuleRequest(epi.href.replace('www.', ''), 'get', emptyKeyValue, null), false);
            try {
                eps[lang].push(ep);
                continue;
            } catch {}
            eps[lang] = [ep];
        }
    }
}
for (lang in eps) { episodes.push.apply(episodes, eps[lang]); }

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, statut, type, 'Vers:' + Object.keys(eps).length, 'Eps: '+ episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);