function Chapters(request, extra, javascriptConfig, output) {
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

function Output(videos, images, text) {
    this.videos = videos;
    this.images = images;
    this.text = text;
}

function Videos(needsResolver, rawVideo) {
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function NeedsResolver(resolverIdentifier, link) {
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function RawVideo(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}
const nineAnimeKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
const cipherKey = "oZH6q4X4VAIHk0Ol"

function getVrf(text){
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
var parsedJson = JSON.parse(savedData.innerHTML);
var extraInfo = parsedJson.extra.extraInfo;
var emptyKeyValue = [new KeyValue('', '')];
var output = [];
var url = new URL(parsedJson.request.url);
var nextRequest = '';
var extraInfo = [new KeyValue('count', '0')];
const script = document.querySelector('script').innerText.replace('*/', '').replace('/*', '');
const html = JSON.parse(script).result;
const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const servers = doc.querySelectorAll('.servers li');
for (var x = 0; x < servers.length; x++) {
    var server = servers[x];
    let id = server.getAttribute('data-link-id');
    let link = `${url.origin}/ajax/server/${id}?vrf=${getVrf(id)}`;
    if (x == 0) {
        nextRequest = link;
    } else {
        extraInfo.push(new KeyValue(`${x}`, `${link}`));
    }
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(new Videos([], []), null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;