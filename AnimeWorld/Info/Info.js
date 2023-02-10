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

let image = document.querySelector('#mobile-thumbnail-watch > img').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
let title = document.querySelector('h2.title').textContent;
let desc = document.querySelector('.desc').textContent.trim();

let genres = Array.from(document.querySelectorAll('.info.col-md-9 a')).map(genre => genre.textContent.trim());
genres.reverse();

let statut = genres[0];
let rating = document.querySelector('dd.rating').textContent.trim();
let type = document.querySelector('dd').textContent.trim();

let episodes = [];
let epsId = [];
for (ep of document.querySelectorAll('#animeId .episode > a')) {
    let epId = ep.getAttribute('data-episode-id');
    if (!epsId.includes(epId)) {
        let link = `${ep.href}#${epId}`;
        if (!link.includes(parsedJson.request.url.split('/play')[0])) {
            link = parsedJson.request.url.split('/play')[0]+link;
        }
        episodes.push(new Chapter('Episodio: '+ep.getAttribute('data-num'), new ModuleRequest(link, 'get', emptyKeyValue, null), false));
        epsId.push(epId);
    }
}

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, statut, rating, type, 'Eps: '+episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);