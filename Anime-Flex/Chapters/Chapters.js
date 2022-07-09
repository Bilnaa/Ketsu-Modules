
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



    function Text(text) {
        this.text = text;
    }

    function getFile(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
        if (request.status === 200) {
            console.log(request.responseText);
            return request.responseText;
        } else {
            return null;
        }
    }

    var output = [];
    var savedData = document.getElementById('ketsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);

    var emptyKeyValue = [new KeyValue('', '')];
    var urls = [];
    var servers = document.querySelectorAll('.ajax_mode li');
    for (server of servers) {
        var type = server.dataset.type;
        var id = server.dataset.post;
        var serv = server.dataset.nume;
        var url = `https://anime-flix.net/wp-json/dooplayer/v2/${id}/${type}/${serv}`;
        urls.push(url);
    }
    for (url of urls) {
        var content = JSON.parse(getFile(url));
        if (!content.type.includes('trailer')) {
            var link = content.embed_url;
            if (!link.includes('anime-flix')) {
                output.push(new NeedsResolver('', new ModuleRequest(link, 'get', emptyKeyValue, null)));
            } else {
                output.push(new NeedsResolver('WATCHSB', new ModuleRequest(link, 'get', emptyKeyValue, null)));
            }
        }
    }

    let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
    var chaptersObject = new Chapters(new ModuleRequest('', '', emptyKeyValue, null), emptyExtra, new JavascriptConfig(
        false, false, ''), new Output(new Videos(output, null), null, null));
    var finalJson = JSON.stringify(chaptersObject);
    savedData.innerHTML = finalJson;
