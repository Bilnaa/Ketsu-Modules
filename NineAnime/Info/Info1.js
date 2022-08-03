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
const nineAnimeKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
const cipherKey = "kMXzgyNzT3k5dYab"

function getVrf(text) {
    return encodeURIComponent(encrypt(cipher(cipherKey, encodeURIComponent(text)), nineAnimeKey))
}

function encrypt(t) {
    var h = nineAnimeKey;
    var i = '';
    for (t = ''.concat(t), r = 0; r < t.length; r++) {
        if (255 < t.charCodeAt(r)) {
            return null;
        }
        for (var i = '', r = 0; r < t.length; r += 3) {
            var u = [void 0, void 0, void 0, void 0];
            u[0] = t.charCodeAt(r) >> 2, u[1] = (3 & t.charCodeAt(r)) << 4, t.length > r + (1) && ((u[1] |= t
                .charCodeAt(r + 1) >> 4, u[2] = (15 & t.charCodeAt(r + 1)) << 2), u[2] = (15 & t
                .charCodeAt(r + 1)) << 2), t.length > r + (2) && (u[2] |= t.charCodeAt(r + 2) >> 6, u[3] =
                63 & t.charCodeAt(r + 2));
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
var parsedJson = JSON.parse(savedData.innerText);
let emptyKeyValue = [new KeyValue('Referer', 'https://9anime.id/home/')];
const url = new URL(parsedJson.request.url);
var image = parsedJson.output.image;
var title = parsedJson.output.title;
var desc = parsedJson.output.description;
var genres = parsedJson.output.genres;
var type = parsedJson.output.field3;
var status = parsedJson.output.field1;
var episodes = [];
var script = document.querySelector('script').innerText.replace('*/', '').replace('/*', '');
var html = JSON.parse(script).result;
var parser = new DOMParser();
var doc = parser.parseFromString(html, 'text/html');
const eps = doc.querySelectorAll('.ep-range li');
for (const ep of eps) {
    let title = `Episode ${ep.querySelector('a').dataset.num}`;
    try {
        title += ': ' + ep.querySelector('.d-title').textContent.trim();
    } catch (e) {}
    const sub_total = ep.querySelector('a').dataset.sub;
    const dub_total = ep.querySelector('a').dataset.dub;
    if (sub_total > 0 && dub_total == 0) {
        const id = ep.querySelector('a').dataset.ids;
        const link = `${url.origin}/ajax/server/list/${id}?vrf=${getVrf(id)}`;
        const obj = new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
        episodes.push(obj);
    } else if (sub_total > 0 && dub_total > 0) {
        let lang = '';
        const ids = ep.querySelector('a').dataset.ids.split(',');
        for (var x = 0; x < ids.length; x++) {
            const id = ids[x];
            if (x == 0) {
                lang = '(Sub)';
            } else {
                lang = '(Dub)';
            }
            const link = `${url.origin}/ajax/server/list/${id}?vrf=${getVrf(id)}`;
            const obj = new Chapter(title + lang, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
            episodes.push(obj);
        }
    }
}
if (episodes.length == 0) {
    console.log('just there doing nothing');
    const dummyQuest = new Chapter('NO EPISODES', new ModuleRequest('https://www.google.com', 'get',
        emptyKeyValue, null), false);
    episodes.push(dummyQuest);
}
parsedJson.request.url = parsedJson.output.link.url;
let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('',
    emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title,
    parsedJson.request, desc, genres, status, type, '', 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerText = finalJson;