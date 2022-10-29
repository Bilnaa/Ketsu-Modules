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

let image = document.querySelector('.fposter > img').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
let title = document.querySelector('#s-title').textContent.trim();
let desc = Array.from(document.querySelectorAll('.flist.clearfix li')).slice(-1)[0].textContent;

let genres = Array.from(document.querySelectorAll('.flist-col a')).map(genre => genre.textContent);

let origin = document.querySelectorAll('.flist-col li')[1].textContent;
let type = parsedJson.request.url.split('stream-')[1].split('/')[0];

let episodes = [];
if (type.includes('film')) { episodes.push(new Chapter(title, new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null), false)) }
else {
    const versions = ['VF','VOSTFR'];
    for (x in versions) {
        let version = versions[x];
        for (ep of document.querySelectorAll('.fx-row .elink')[x].querySelectorAll('p')) {
            let link = `${parsedJson.request.url}#${ep.getAttribute('onclick').split('\'')[3]}`;
            episodes.push(new Chapter(version+' '+ep.textContent, new ModuleRequest(link, 'get', emptyKeyValue, null), false));
        }
    }
}

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, origin, '', type, 'Eps: '+ episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);