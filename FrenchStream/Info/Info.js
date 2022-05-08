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

var image = document.querySelector('.fposter > img').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
var title = document.querySelector('#s-title').textContent.trim();
var desc = document.querySelector('.fdesc').textContent.trim();

var genres = [];
var genreList = document.querySelector('li[rel=\"nofollow').textContent.split(':')[1].split(', ');
for (genre of genreList) { genres.push(genre) }

var type = parsedJson.request.url.split('run/')[1].split('/')[0];

var episodes = [];
if (type == 'film') {episodes.push(new Chapter(title, new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null), false))}
else {
    var blockLang=['vf','vostfr'];
    var lang = document.querySelector('.gGoup').querySelectorAll('.elink');
    for (var x = 0; x<lang.length;x++) {
        var epList = lang[x].querySelectorAll('a');
        for (var y = 0; y<epList.length;y++) {
            var link = parsedJson.request.url+'#'+blockLang[x]+'-'+epList[y].title.split('sode')[1].trim();
            episodes.push(new Chapter(epList[y].title+' '+blockLang[x], new ModuleRequest(link, 'get', emptyKeyValue, null), false));
        }
    }
}

const infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, statut, 'Anime', type, 'Eps: '+ episodes.length, episodes));

savedData.innerHTML = JSON.stringify(infoPageObject);