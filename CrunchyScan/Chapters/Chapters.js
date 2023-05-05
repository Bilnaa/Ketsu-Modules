try {
    
     /* JAVASCRIPT STARTS */
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
    var output = [];
    var savedData = document.getElementById('ketsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);
    var emptyKeyValue = [new KeyValue('Referer', parsedJson.request.url)];
    let newRequest = new ModuleRequest(parsedJson.request.url, 'get', emptyKeyValue, null);
    var commands = [new Commands('helperFunction', [new KeyValue('isCustomRequest', 'true'), new KeyValue('name', 'example')])];
    if(parsedJson.global.variables.length != 0) {
        
        
        let images = JSON.parse(parsedJson.global.variables[1].value);
        
        for (let image of images) {
            let link = atob(image);
           output.push(new ModuleRequest(link, 'get', emptyKeyValue, null));
            
        }
    }
    let emptyExtra = new Extra(commands, emptyKeyValue);
    var chaptersObject = new Chapters(newRequest, emptyExtra, new JavascriptConfig(false, false, ''), new Output(null, output, null), new Extra('', emptyKeyValue));
    var finalJso= JSON.stringify(chaptersObject);
    nsavedData.innerHTML = finalJson;
    /* JAVASCRIPT ENDS */  
} catch (e) {
    
    console.error(e.message);
     
    if (typeof KETSU_ASYNC !== 'undefined') {
        
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
        
    }
     
}
 