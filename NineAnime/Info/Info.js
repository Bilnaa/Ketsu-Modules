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

function getStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x].innerText;
        if (data.includes(match)) {
            return data.replace(match, '').trim();
        }
    }
}

function getHtmlStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        var data = array[x].innerText;
        if (data.includes(match)) {
            return array[x];
        }
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerText);
var emptyKeyValue = [new KeyValue('Referer', parsedJson.request.url)];
var commands = [new Commands('', emptyKeyValue)];
var newRequest = new ModuleRequest('', '', emptyKeyValue, null);
const info = document.querySelector('.info');
const metaArr = info.querySelectorAll('.bmeta > .meta > div');
let meta = {};
for (const m of metaArr) {
    let re = m.textContent.split(':');
    const key = re[0].trim().replace(' ', '-').toLowerCase();
    const value = re[1].trim();
    meta[key] = value;
}
var episodes = [];
var type = meta.type ? meta.type : 'TV';
var status = meta.status ? meta.status : 'On Going';
var genres = meta.genre ? meta.genre.split(', ') : [];
var desc = '';
var title = info.querySelector('h1').textContent.trim();
var image = document.querySelector('.poster img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
desc = document.querySelector('.synopsis.mb-3 .content').textContent.trim();
var KETSU_ASYNC = true;
async function doStuff() {
    for (var x = 0; x < 13; x++) {
       await sleep(2500);
        let divEpisodes = document.querySelector("#w-episodes");
        let total = divEpisodes.querySelectorAll('li').length;
        if (total != null) {
            let eps = divEpisodes.querySelectorAll('li');
            for (let ep of eps) {
                let title = `Episode ${ep.querySelector('a').dataset.num}`;
                let link = ep.querySelector('a').href;
                let obj = new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
                episodes.push(obj);
            }
            break
        }
    }
    var infoPageObject = new Info(new ModuleRequest('', 'get', emptyKeyValue, null), new Extra(commands, emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, 'Anime', type, 'Eps: ' + episodes.length, episodes));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;
    window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
}
 doStuff(); 