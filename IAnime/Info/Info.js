
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

    function getStuff(array, match) {
        for (var x = 0; x < array.length; x++) {
            let data = array[x].innerText;
            if (data.includes(match)) {
                return data.replace(match, '').trim();
            }
        }
    }

    function getHtmlStuff(array, match) {
        for (var x = 0; x < array.length; x++) {
            let data = array[x].innerText;
            if (data.includes(match)) {
                return array[x];
            }
        }
    }
    var savedData = document.getElementById('ketsu-final-data');
    var parsedJson = JSON.parse(savedData.innerHTML);
    let emptyKeyValue = [new KeyValue('', '')];
    var episodes = [];
    var status = 'Unknown';
    var genres = [];
    var inf = [];
    var sort = [];
    var crack = [];
    var filt = [];
    var date = '';
    var duree = '';
    var type = '';
    var desc = '';
    if (parsedJson.request.url.includes('manga')) {
        var connais = document.querySelector('.post-wrapper center img ').src;
        if (connais.includes('Drama')) {
            var title = document.querySelector('.content-inner center').textContent.trim();
            var imf = document.querySelector('.post-wrapper center div').style.backgroundImage.substr('5');
            var image = imf.split(')')[0].trim().replace('\"', '');
            image = new ModuleRequest(image, 'get', emptyKeyValue, null);
            desc = 'Drama Japonais ou autres';
            genres = ['Dramas', 'Japonais'];
            date = 'Unknown';
            type = 'Vostfr';
            duree = 'Unknown';
            var check = document.querySelectorAll('.inner ul li a ');
            for (ch of check) {
                var epi = ch.textContent.trim();
                var link = ch.href;
                var chapitre = new Chapter(epi, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
                filt.push(chapitre);
                episodes = filt.filter(function (bon) {
                    if (bon.chapName.includes('Episode') || (bon.chapName.includes('Oav ')) || (bon.chapName.includes('Special '))) {
                        return episodes;
                    }
                })
            }
        } else {
            var title = document.querySelector('.content-inner center').textContent.trim();
            var imf = document.querySelector('.post-wrapper center div').style.backgroundImage.substr('5');
            var image = imf.split(')')[0].trim().replace('\"', '');
            image = new ModuleRequest(image, 'get', emptyKeyValue, null);
            var test = document.querySelectorAll('fieldset');
            desc = test[1].querySelector('font').textContent.replaceAll('\\n', '');
            var ok = document.querySelectorAll('fieldset tbody');
            inf = ok[0].querySelectorAll('td:nth-child(2) font');
            for (i = 0; i < inf.length; i++) {
                if (inf[i].getAttribute('color') === '#4682B4') {
                    crack.push(inf[i]);
                }
            }
            for (i = 0; i < crack.length; i++) {
                if (crack[i].textContent.includes('min')) {
                    var duree = crack[i].textContent.trim();
                }
                if (crack[i].textContent.includes('.')) {
                    date = crack[i].textContent.trim();
                }
                if (crack[i].textContent.includes(',')) {
                    genres = crack[i].textContent.trim().split(',');
                }
                if (crack[i].textContent.includes('TV') || crack[i].textContent.includes('Tv') || crack[i].textContent
                    .includes('-')) {
                    var type = crack[i].textContent.trim();
                }
            }
            var check = document.querySelectorAll('.inner ul li a ');
            for (ch of check) {
                var epi = ch.textContent.trim();
                var link = ch.href;
                var chapitre = new Chapter(epi, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
                filt.push(chapitre);
                episodes = filt.filter(function (bon) {
                    if (bon.chapName.includes('Episode') || (bon.chapName.includes('Oav ')) || (bon.chapName.includes('Special ')) ) {
                        return episodes;
                    }
                })
            }
        }
    }
    if (parsedJson.request.url.includes('serie')) {
        var title = document.querySelector('.content-inner center').textContent.trim();
        var imf = document.querySelector('.post-wrapper center div').style.backgroundImage.substr('5');
        var image = imf.split(')')[0].trim().replace('\"', '');
        image = new ModuleRequest(image, 'get', emptyKeyValue, null);
        var test = document.querySelectorAll('fieldset');
        var desc = test[1].querySelector('font').textContent.replaceAll('\\n', '');
        var ok = document.querySelectorAll('fieldset tbody');
        inf = ok[0].querySelectorAll('td:nth-child(2) font');
        for (i = 0; i < inf.length; i++) {
            if (inf[i].getAttribute('color') === '#4682B4') {
                crack.push(inf[i]);
            }
        }
        for (i = 0; i < crack.length; i++) {
            if (crack[i].textContent.includes('min')) {
                duree = crack[i].textContent.trim();
            }
            if (crack[i].textContent.includes('.')) {
                date = crack[i].textContent.trim();
            }
            if (crack[i].textContent.includes(',')) {
                genres = crack[i].textContent.trim().split(',');
            }
            if (crack[i].textContent.includes('TV') || crack[i].textContent.includes('Tv')) {
                type = crack[i].textContent.trim();
            }
        }
        var check = document.querySelectorAll('.inner ul li a ');
        for (ch of check) {
            var epi = ch.textContent.trim();
            var link = ch.href;
            var chapitre = new Chapter(epi, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
            filt.push(chapitre);
            episodes = filt.filter(function (bon) {
                if (bon.chapName.includes('Episode')) {
                    return episodes;
                }
            })
        }
    }
    if (parsedJson.request.url.includes('film')) {
        var image = '';
        var title = document.querySelector('.content-inner center').textContent.trim();
        var imf = document.querySelector('.post-wrapper center div').style.backgroundImage.substr('5');
        image = imf.split(')')[0].trim().replace('\"', '');
        image = new ModuleRequest(image, 'get', emptyKeyValue, null);
        var test = document.querySelectorAll('fieldset');
        var desc = test[1].querySelector('font').textContent.replaceAll('\\n', '');
        var ok = document.querySelectorAll('fieldset tbody');
        inf = ok[0].querySelectorAll('td:nth-child(2) font');
        for (i = 0; i < inf.length; i++) {
            if (inf[i].getAttribute('color') === '#4682B4') {
                crack.push(inf[i]);
            }
        }
        var date = '';
        var duree = '';
        var type = '';
        for (i = 0; i < crack.length; i++) {
            if (crack[i].textContent.includes('/')) {
                duree = crack[i].textContent.trim();
            }
            if (crack[i].textContent.includes('.') || Number.isInteger(Date.parse(crack[i].textContent.trim())) ===
                true) {
                date = crack[i].textContent.trim();
            }
            if (crack[i].textContent.includes(',')) {
                genres = crack[i].textContent.trim().split(',');
            }
            if (crack[i].textContent.includes('TV') || crack[i].textContent.includes('Tv')) {
                type = crack[i].textContent.trim();
            }
        }
        var link = document.querySelector('.post-wrapper center center a').href;
        var chapitre = new Chapter(title, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
        episodes.push(chapitre);
    }
    let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('',
        emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''), new Output(image, title,
        parsedJson.request, desc, genres, date, duree, type, 'Eps: ' + episodes.length, episodes));
    var finalJson = JSON.stringify(infoPageObject);
    savedData.innerHTML = finalJson;
