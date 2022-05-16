function Header(key, value) {
	this.key = key;
	this.value = value;
    }

    function ExtraInfo(value) {
        this.value = value;
    }

    function Output(moduleID, image, link, title, type, voice, stars) {
        this.moduleID = moduleID;
        this.image = image;
        this.link = link;
        this.title = title;
        this.type = type;
        this.voice = voice;
        this.stars = stars;
    }

    function SearchObject(request, method, headers, separator, extraInfo, loadJavascript, javaScript, output) {
        this.request = request;
        this.method = method;
        this.headers = headers;
        this.separator = separator;
        this.extraInfo = extraInfo;
        this.loadJavascript = loadJavascript;
        this.javaScript = javaScript;
        this.output = output;
    }
    var savedData = document.getElementById('katsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);
    var moduleID = '20';
    var headers = [new Header('', '')];
    var extraInfo = [new ExtraInfo('')];
    var searchPageObject;
    var output = [];
    var searchElements = document.querySelectorAll('div.col-md-8.order-1 > div > article');
    for(var x = 0; x < searchElements.length; x++) {
        var element = searchElements[x];
        var cover = element.querySelector('img').src;
        var link = element.querySelector('div.action a').href;
        var title = element.querySelector('img').title;
        if(title.includes('VF')) {
            var type = 'VF';
        } else {
            var type = 'VOSTFR';
        };
        var voice = '';
        var stars = '';
        var searchObj = new Output(moduleID, cover, link, title, type, voice, stars);
        output.push(searchObj);
    }
    searchPageObject = new SearchObject('', '', headers, '+', extraInfo, '', '', output);
    var finalJson = JSON.stringify(searchPageObject);
    savedData.innerHTML = finalJson;