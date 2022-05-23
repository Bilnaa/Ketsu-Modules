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

function Chapter(chapName, link, openInWebView) {
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
var parsedJson = JSON.parse(savedData.innerText);
let emptyKeyValue = [new KeyValue('Referer', 'https://9anime.to/home/')];
var image = parsedJson.output.image;
var title = parsedJson.output.title;
var desc = parsedJson.output.description;
var genres = parsedJson.output.genres;
var type = parsedJson.output.field3;
var status = parsedJson.output.field1;
var episodes = [];
var script = document.querySelector('script').innerText.replace('*/', '').replace('/*', '');
var html = JSON.parse(script).html;
var parser = new DOMParser();
var doc = parser.parseFromString(html, 'text/html');
const eps = doc.querySelectorAll('.episodes > li > a');
for (const ep of eps) {
    let title = ep.textContent.trim();
    title = title.includes('Full') ? title : `Episode ${title}`;
    let sources = JSON.parse(ep.dataset.sources);
    let link = 'https://google.com/?';
    for (const key in sources) {
        link += link.length == 20 ? `${key}=${sources[key]}` : `&${key}=${sources[key]}`;
    }
    const obj = new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
    episodes.push(obj);
}
if (episodes.length == 0) {
    console.log('just there doing nothing');
    const dummyQuest = new Chapter('NO EPISODES', new ModuleRequest('https://www.google.com', 'get', emptyKeyValue, null), false);
    episodes.push(dummyQuest);
}
parsedJson.request.url = parsedJson.output.link.url;
let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, type, '', 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerText = finalJson;