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
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var extraInfo = parsedJson.extra.extraInfo;
let nextRequest = '';
var emptyKeyValue = [new KeyValue('Referer', 'https://9anime.gs/watch/')];
var KETSU_ASYNC = true;
var output = [];



async function getVideos() {
    for (let x = 0; x < 100; x++) {
        if (output.length >= 1) {
            break
        } else {
            await sleep(1000).then(async () => {
                let divProv = document.querySelectorAll("#w-servers > div.servers .type li");
                if (divProv.length >= 1) {
                    for (let prov of divProv) {
                        prov.dispatchEvent(new Event('click'));
                      await sleep(2500).then(async ()=> {
                        for (let i = 0; i < 100; i++) {
                            let iframe = document.querySelector('iframe');
                            if (iframe.src != undefined) {
                                await sleep(2500).then(() => {
                                    let link = document.querySelector('iframe').src;
                                    output.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null)));
                                })
                                break;
                            }
                        }
                      })
                    }
                }
            })
        }
    }
    let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
    var chaptersObject = new Chapters(new ModuleRequest('', 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(new Videos(output, null), null, null));
    var finalJson = JSON.stringify(chaptersObject);
    savedData.innerHTML = finalJson;
    window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
}
getVideos();