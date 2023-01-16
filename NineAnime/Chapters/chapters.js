function Chapters(request, extra, javascriptConfig, output)
{
    this.request = request;
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
    this.output = output;
}

function ModuleRequest(url, method, headers, httpBody)
{
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.httpBody = httpBody;
}

function Extra(commands, extraInfo)
{
    this.commands = commands;
    this.extraInfo = extraInfo;
}

function Commands(commandName, params)
{
    this.commandName = commandName;
    this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript)
{
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}

function KeyValue(key, value)
{
    this.key = key;
    this.value = value;
}

function Output(videos, images, text)
{
    this.videos = videos;
    this.images = images;
    this.text = text;
}

function Videos(needsResolver, rawVideo)
{
    this.needsResolver = needsResolver;
    this.rawVideo = rawVideo;
}

function NeedsResolver(resolverIdentifier, link)
{
    this.resolverIdentifier = resolverIdentifier;
    this.link = link;
}

function RawVideo(video)
{
    this.video = video;
}

function Video(videoQuality, videoLink)
{
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function getValueFromKey(keys, key)
{
    for (var x = 0; x < keys.length; x++)
    {
        let tKey = keys[x];
        if (tKey.key == key)
        {
            return tKey.value;
        }
    }
}
async function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

class iframeInterval
{
    constructor(time, maxTries, callback, maxTriesCallback)
    {
        this.tries = 0;

        this.interval = setInterval(async () =>
        {
            if (this.tries >= maxTries)
            {
                              this.cancelTimer();
                maxTriesCallback(this);
                return
            }

            callback(this);
            this.tries += 1;
        }, time);

    }

    cancelTimer()
    {
        clearInterval(this.interval);

    }
}

var global = window || global;
global.iframeInterval = iframeInterval;

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var extraInfo = parsedJson.extra.extraInfo;
let nextRequest = '';
var emptyKeyValue = [new KeyValue('Referer', 'https://9anime.gs/watch/')];
var KETSU_ASYNC = true;
var output = [];


window.mcs = 0;
window.foundStrms = [];


new iframeInterval(100, 50, (interval) =>
    {
        // Callback
        let buttons = document.querySelectorAll("#w-servers > div.servers .type li");
        if (buttons.length > 0)
        {
            interval.cancelTimer();
            getIframe();
        }
    },
    (interval) =>
    {
        // Error callback
              interval.cancelTimer();
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
    })



async function getIframe()
{

    let buttons = document.querySelectorAll("#w-servers > div.servers .type li");
    buttons[this.window.mcs].dispatchEvent(new Event('click'));
    console.log(window.mcs)
    new iframeInterval(100, 30, (interval) =>
        {
            // Callback
            let iframe = document.querySelector('iframe');
            if (iframe.src != undefined && !window.foundStrms.includes(iframe.src))
            {
                console.log(iframe.src)
                window.foundStrms.push(iframe.src);
                let type = buttons[this.window.mcs].parentElement.parentElement.dataset.type.toUpperCase();
                if (iframe.src != "" && !iframe.src.includes('addthis') && !iframe.src.includes('disqus.com'))
                {
                    let link_match = '';
                    if(!iframe.src.includes('www')){
                        link_match = iframe.src.split('/')[2].split('.')[0].toUpperCase()
                    } else {
                        link_match = iframe.src.split('/')[2].split('.')[1].toUpperCase()
                    }
                    output.push(new NeedsResolver(`(${type}) ${link_match}`, new ModuleRequest(iframe.src, 'get', emptyKeyValue, null)));
                    getNextStream();
                    interval.cancelTimer();
                }

            }

        },
        (interval) =>
        {
            // Error callback
                      interval.cancelTimer();
            getNextStream();
        });

}

function getNextStream()
{

    let buttons = document.querySelectorAll("#w-servers > div.servers .type li");

    if (window.mcs >= buttons.length - 1)
    {
        let emptyExtra = new Extra([new Commands('', emptyKeyValue)], extraInfo);
        var chaptersObject = new Chapters(new ModuleRequest('', 'get', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(new Videos(output, null), null, null));
        var finalJson = JSON.stringify(chaptersObject);
        savedData.innerHTML = finalJson;
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
        return;
    }
      window.mcs += 1;

    getIframe();
} 