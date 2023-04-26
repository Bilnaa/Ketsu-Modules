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
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
var episodes = [];
let content = document.querySelectorAll('.post-content_item');

let status = '';
let type = '';
for (let x = 0; x < content.length; x++) {
    let data = content[x].querySelector('h5').textContent.trim();
    if (data.includes('Type')) {
        type = content[x].querySelector('.summary-content').textContent.trim();
    }
    if (data.includes('Statut')) {
        status = content[x].querySelector('.summary-content').textContent.trim().replace('🟢','').replace('🔴','').replace('🟡','');
    }
}

let genres = [];
genres = Array.from(document.querySelectorAll('.genres-content a')).map(g => g.textContent);
let desc = '';
desc = document.querySelector("div.manga-excerpt");
if (desc) {
    desc = desc.textContent.trim().replaceAll('\n','');
} else {
    desc = ''
}

let title = document.querySelector('.post-title h1').textContent.trim();
let image = document.querySelector('.summary_image a img').dataset.src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
let nextRequestHeaders = [new KeyValue('Referer', parsedJson.request.url), new KeyValue('x-requested-with', 'XMLHttpRequest')];
nextRequestHeaders.push(new KeyValue('accept', '*/*'));
nextRequestHeaders.push(new KeyValue('accept-encoding', 'gzip, deflate, br'));
nextRequestHeaders.push(new KeyValue('accept-language', 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,pt;q=0.5'));
let nextRequest = new ModuleRequest(parsedJson.request.url + 'ajax/chapters', 'POST', nextRequestHeaders, null);

let infoPageObject = new Info(nextRequest, new Extra([new Commands('',emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, true, ''), new Output(image, title,parsedJson.request, desc, genres, status, type, 'empty', 'Chapters : ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;