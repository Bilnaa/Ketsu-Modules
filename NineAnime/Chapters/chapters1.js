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

function getValueFromKey(keys, key) {
    for (var x = 0; x < keys.length; x++) {
        let tKey = keys[x];
        if (tKey.key == key) {
            return tKey.value;
        }
    }
}

function decrypt(input, key) {
    var t = input.replace(/[\t\n\f\r]/g, '');
    if (t.length % 4 == 1 || t.match(/[^\+/0-9A-Za-z]/)) throw new Error('bad input');
    var i = 0;
    var r = '';
    var e = 0;
    var u = 0;
    for (var o = 0; o < t.length; o++) {
        e = e << 6;
        i = key.indexOf(t[o]);
        e = e | i;
        u += 6;
        if (24 == u) {
            r += String.fromCharCode((16711680 & e) >> 16);
            r += String.fromCharCode((65280 & e) >> 8);
            r += String.fromCharCode(255 & e);
            e = 0;
            u = 0;
        }
    }
    return 12 == u ? r + String.fromCharCode(e >> 4) : 18 == u ? r + String.fromCharCode((65280 & e) >> 8) +
        String.fromCharCode(255 & e) : r;
}

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

function getLink(text) {
    return decodeURIComponent(cipher(cipherKey, decrypt(text, nineAnimeKey)).replace('%3A%2F%2F','://').replaceAll('%2F','/').replace('%FT','').replace(/=+$/g, ''));
}
const nineAnimeKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const cipherKey = 'kMXzgyNzT3k5dYab';
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var extraInfo = parsedJson.extra.extraInfo;
var emptyKeyValue = [new KeyValue('Referer', 'https://9anime.id/watch/')];
var output = parsedJson.output.videos;;
var actualCount = getValueFromKey(extraInfo, 'count');
var nextCount = parseInt(actualCount.match(/\d+/g)[0]) + 1;
var nextRequest = getValueFromKey(extraInfo, nextCount);
if (actualCount == 0) {
    output = new Videos([], []);
}
const script = document.querySelector('script').innerHTML.replace('/*', '').replace('*/', '');
const data = getLink(decodeURIComponent(JSON.parse(script).result.url.replaceAll('=', '')));
output.needsResolver.push(new NeedsResolver('', new ModuleRequest(data.replace('streamtape.com', 'streamta.pe')
    .replace('?autostart=true', ''), 'get', emptyKeyValue, null)));
extraInfo[0].value = '' + (parseInt(actualCount) + 1);
if (nextRequest == undefined) {
    nextRequest = '';
}
let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
var chaptersObject = new Chapters(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), emptyExtra,
    new JavascriptConfig(false, false, ''), new Output(output, null, null));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;