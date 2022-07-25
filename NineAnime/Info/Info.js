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
const cipherKey = 'rTKp3auwu0ULA6II';

function getVrf(id) {
    return encrypt(cipher(cipherKey, encodeURIComponent(id))).replace(/=+$/g, '');
}

function encrypt(t) {
    var h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var i = '';
    for (t = ''.concat(t), r = 0; r < t.length; r++) {
        if (255 < t.charCodeAt(r)) {
            return null;
        }
        for (var i = '', r = 0; r < t.length; r += 3) {
            var u = [void 0, void 0, void 0, void 0];
            u[0] = t.charCodeAt(r) >> 2, u[1] = (3 & t.charCodeAt(r)) << 4, t.length > r + (1) && ((u[1] |= t.charCodeAt(r + 1) >> 4, u[2] = (15 & t.charCodeAt(r + 1)) << 2), u[2] = (15 & t.charCodeAt(r + 1)) << 2), t.length > r + (2) && (u[2] |= t.charCodeAt(r + 2) >> 6, u[3] = 63 & t.charCodeAt(r + 2));
            for (var e = 0; e < u.length; e++) {
                'undefined' == typeof u[e] ? i += '=' : i += function (t) {
                    if (0 <= t && t < 64) {
                        return h[t];
                    }
                }(u[e]);
            }
        }
    }
    return i;
};

function cipher(key, text) {
    var arr = new Array(256);
    for (var i = 0; i < 256; i++) {
        arr[i] = i;
    }
    var u = 0;
    var r;
    for (var i = 0; i < 256; i++) {
        u = (u + arr[i] + key[i % key.length].charCodeAt(0)) % 256;
        r = arr[i];
        arr[i] = arr[u];
        arr[u] = r;
    }
    u = 0;
    var c = 0;
    return text.split('').map(function (j) {
        c = (c + 1) % 256;
        u = (u + arr[c]) % 256;
        r = arr[c];
        arr[c] = arr[u];
        arr[u] = r;
        return String.fromCharCode(j.charCodeAt(0) ^ arr[(arr[c] + arr[u]) % 256]);
    }).join('');
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('Referer', 'https://9anime.id/home')];
var url = new URL(parsedJson.request.url);
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
var title = info.querySelector('h1.title').textContent.trim();
var image = document.querySelector('.poster img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
const desc = document.querySelector('.synopsis.mb-3 .content').textContent.trim();
var id = document.querySelector('#watch-main').dataset.id;
var vrf = getVrf(id);
var nextRequest = `${url.origin}/ajax/episode/list/${id}?vrf=${getVrf(id)}`;
let infoPageObject = new Info(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, 'Anime', type, 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;