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

function getCaptcha() {
    return new Commands('helperFunction', [new KeyValue('name', 'getReCaptcha')]);
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
var savedData = document.getElementById('ketsu-final-data');
let parsedData = JSON.parse(savedData.innerText);
let emptyKeyValue = [new KeyValue('', '')];
let commands = new Commands('', emptyKeyValue);
var ids = [];
for (x of parsedData.extra.extraInfo) {
    try {
        if (x.key == 'key') {
            ids.push(x.value);
        }
    } catch {}
}
var code = parsedData.extra.extraInfo[0].value;
if (code == undefined || code == '') {
    commands = getCaptcha();
} else {
    var fucked = false;
    var metadata = [];
    var language = [];
    for (server of ids) {
        if (server.includes('dub')) {
            language.push('dub');
        } else {
            language.push('sub');
        }
        let mId = server.replace('sub', '').replace('dub', '');
        var request = new XMLHttpRequest();
        request.open('GET', 'https://zoro.to/ajax/v2/episode/sources?id=' + mId + '&_token=' + code, false);
        request.setRequestHeader('accept', '*/*');
        request.setRequestHeader('x-requested-with', 'XMLHttpRequest');
        request.send(null);
        if (request.status === 200) {
            let parsed = JSON.parse(request.responseText);
            try {
                if (parsed.link == '' || parsed.link == undefined) {
                    fucked = true;
                    break;
                }
                var link = parsed.link;
                if (link.includes('rapid-cloud')) {
                    link = link + '&autoPlay=1&oa=0';
                }
                metadata.push(link);
            } catch {
                fucked = true;
                break;
            }
        } else {
            fucked = true;
            break;
        }
    }
    if (fucked) {
        commands = getCaptcha();
    } else {
        var output = new Videos([], []);
        for (var x = 0; x < metadata.length; x++) {
            var data = {
                link: metadata[x]
            };
            if(data.link.includes('watchsb')){
            var lan = language[x];
            if (data.link.includes('streamtape.com')) {
                var fixedLink = data.link.replace('https://streamtape.com/', 'https://streamta.pe/');
                if (lan.includes('dub')) {
                    output.needsResolver.push(new NeedsResolver('STREAMTA DUB', new ModuleRequest(fixedLink, 'get', emptyKeyValue, null)));
                } else if (data.link.includes('streamtape') && lan.includes('dub')) {
                    output.needsResolver.push(new NeedsResolver('STREAMTAPE DUB', new ModuleRequest(fixedLink, 'get', emptyKeyValue, null)));
                } else {
                    output.needsResolver.push(new NeedsResolver('', new ModuleRequest(fixedLink, 'get', emptyKeyValue, null)));
                }
            }
            try {
                if (lan.includes('dub')) {
                    resolver = data.link.split('/')[2].split('.')[0].toUpperCase();
                    output.needsResolver.push(new NeedsResolver(resolver + ' DUB', new ModuleRequest(data.link, 'get', emptyKeyValue, null)));
                } else {
                    output.needsResolver.push(new NeedsResolver('', new ModuleRequest(data.link, 'get', emptyKeyValue, null)));
                }
            } catch {
                output.needsResolver = [new NeedsResolver('', new ModuleRequest(data.link, 'get', emptyKeyValue, null))];
            }
        }
    }
        let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
        var chaptersObject = new Chapters(new ModuleRequest('', 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(output, null, null));
        var finalJson = JSON.stringify(chaptersObject);
        savedData.innerHTML = finalJson;
    }
}