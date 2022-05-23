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

function test(t) {
    var h = '0wMrYU+ixjJ4QdzgfN2HlyIVAt3sBOZnCT9Lm7uFDovkb/EaKpRWhqXS5168ePcG';
    var i = '';
    var Ht = '=';
    for (t = ''.concat(t), r = 0; r < t.length; r++) {
        if (255 < t.charCodeAt(r)) {
            return null;
        }
        for (var i = '', r = 0; r < t.length; r += 3) {
            var u = [undefined, undefined, undefined, undefined];
            u[0] = t.charCodeAt(r) >> 2, u[1] = (3 & t.charCodeAt(r)) << 4, t.length > r + (1) && (u[1] |= t.charCodeAt(r + 1) >> 4, u[2] = (15 & t.charCodeAt(r + 1)) << 2), t.length > r + (2) && (u[2] |= t.charCodeAt(r + 2) >> 6, u[3] = 63 & t.charCodeAt(r + 2));
            for (var e = 0; e < u.length; e++) {
                'undefined' == typeof u[e] ? i += Ht : i += function (t) {
                    if (0 <= t && t < 64) {
                        console.log(h[t]);
                        return h[t];
                    }
                }(u[e]);
            }
        }
    }
    return i;
};

function helperOne(t, n) {
    return t % n;
}

function helperTwo(t, n) {
    return t < n;
}

function je(t, n) {
    var c = '';
    for (var u, e = [], o = 0, c = '', f = 256, s = 0; s < f; s += 1) e[s] = s;
    for (s = 0; s < f; s += 1) o = helperOne(o + e[s] + t.charCodeAt(s % t.length), f), u = e[s], e[s] = e[o], e[o] = u;
    for (var o = s = 0, a = 0; helperTwo(a, n.length); a += 1) o = (o + e[s = (s + a) % f]) % f, u = e[s], e[s] = e[o], e[o] = u, c += String.fromCharCode(n.charCodeAt(a) ^ e[(e[s] + e[o]) % f]);
    return c;
}

function getId(t) {
    var i = test(encodeURIComponent(t) + '0000000');
    i = i.substr(0, 6).split('').reverse().join('');
    return i + test(je(i, encodeURIComponent(''.concat(t)))).replace(/=+$/g, '');
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('Referer', 'https://9anime.id/home')];
const info = document.querySelector('.info');
try {
    document.querySelector('p[itemprop=description] .more').click();
} catch (e) {
    console.log(e);
}
const metaArr = info.querySelectorAll('.meta > div > div');
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
var title = info.querySelector('h1.title').textContent.trim();
var image = document.querySelector('#info > .thumb > div > img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
try {
    desc = info.querySelector('p[itemprop=description]').textContent.replace('less', '').replace(' less', '').trim();
} catch {}
try {
    if (desc.length == 0) {
        desc = info.querySelector('p[itemprop=depion]').textContent;
    }
} catch {}
desc = desc.replace(/\"/g, '');
var id = parsedJson.request.url.split('/')[4].split('.').pop();
var vrf = getId(id);
var nextRequest = `https://9anime.to/ajax/anime/servers?vrf=${encodeURIComponent(vrf)}&id=${id}`;
let infoPageObject = new Info(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, 'Anime', type, 'Eps: ' + episodes.length, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;