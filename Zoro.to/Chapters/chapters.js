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

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
var output = new Videos([], []);
var savedData = document.getElementById('ketsu-final-data');
let parsedData = JSON.parse(savedData.innerText);
let data = JSON.parse(document.querySelector('script').innerText.replace('/*', '').replace('*/', '')).html.trim();
if (parsedData.global.variables.length > 0) {
    let emptyKeyValue = [new KeyValue('token', parsedData.global.variables[0].value)];
    let holder = document.createElement('div');
    holder.id = 'holder';
    document.body.prepend(holder);
    holder.innerHTML = data;
    let servers = document.querySelectorAll('.server-item');
    var ids = [];
    for (div of servers) {
        try {
            let lol = div.getAttribute('data-id') + '' + div.getAttribute('data-type');
            emptyKeyValue.push(new KeyValue('key', lol));
        } catch {}
    }
    let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
    var chaptersObject = new Chapters(new ModuleRequest('https://zoro.to/ajax/v2/episode/servers', 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, true, ''), new Output(output, null, null));
    var finalJson = JSON.stringify(chaptersObject);
    savedData.innerHTML = finalJson;
}