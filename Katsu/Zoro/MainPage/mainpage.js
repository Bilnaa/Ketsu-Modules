function Header(key, value) {
    this.key = key;
    this.value = value;
}

function ExtraInfo(value) {
    this.value = value;
}

function Output(lastEpisodes, lastAnimes) {
    this.lastEpisodes = lastEpisodes;
    this.lastAnimes = lastAnimes;
}

function LastAnimes(moduleID, image, link, title) {
    this.moduleID = moduleID;
    this.image = image;
    this.link = link;
    this.title = title;
}

function LastEpisodes(moduleID, image, link, title, episode) {
    this.moduleID = moduleID;
    this.image = image;
    this.link = link;
    this.title = title;
    this.episode = episode;
}

function MainPageObject(request, headers, method, extraInfo, loadJavascript, javaScript, output) {
    this.request = request;
    this.headers = headers;
    this.method = method;
    this.extraInfo = extraInfo;
    this.loadJavascript = loadJavascript;
    this.javaScript = javaScript;
    this.output = output;
}
var savedData = document.getElementById('katsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var moduleID = '114653268923213246';
var headers = [new Header('', '')];
var extraInfo = [new ExtraInfo('')];
var mainPageObject;
var output;
var lastAnimes = [];
var lastEpisodes = [];
var last = document.querySelectorAll(
    '#main-content > section:nth-child(2) > div.tab-content > div > div.film_list-wrap div.flw-item');
for (list of last) {
    let title = list.querySelector('img').alt;
    var link = 'https://zoro.to/' + list.querySelector('.film-name a').href;
    var image = list.querySelector('img').dataset.src;
    var ep = '??';
    try {
        ep = list.querySelector('.tick.rtl').textContent.trim().replace('Ep', '').replaceAll(' ', '');
    } catch (e) {
        ep = list.querySelector('.tick.rtl');
        if (ep == null) {
            ep = '??';
        } else {
            ep = list.querySelector('.tick.rtl').textContent.trim()
        }
    }
    var language = '??';
    try {
        language = list.querySelector('.tick.ltr').textContent.replaceAll('\n', '').trim().replace(' ', '/')
            .replaceAll(' ', '');
    } catch {
        language = list.querySelector('.tick.ltr');
        if (language == null) {
            language = '??';
        } else {
            language = list.querySelector('.tick.ltr').innerText.trim().replace('\n', '/');
        }
    }
    if (list.querySelector('.fdi-item').innerText.includes('Special')) {
        ep = 'Special';
        language = '';
    }
    lastEpisodes.push(new LastEpisodes(moduleID, image, link, title + ' ' + language, ep));
}
var mostviewed = document.querySelectorAll('#top-viewed-week > ul > li');
for (list of mostviewed) {
    let title = list.querySelector('img').alt;
    var link = 'https://zoro.to/' + list.querySelector('a').href;
    var image = list.querySelector('img').dataset.src;
    var views = '??';
    try {
        views = list.querySelector('.fdi-item').textContent.trim();
    } catch {
        views = list.querySelector('.fdi-item');
    }
    if (views == null) {
        views = '??';
    }
    lastAnimes.push(new LastEpisodes(moduleID, image, link, title + ' ' + language, ''));
}
while (lastEpisodes.length % 2 != 0) {
    lastEpisodes.push(lastEpisodes[0]);
}
while (lastAnimes.length % 3 != 0) {
    lastAnimes.push(lastAnimes[0]);
}
output = new Output(lastEpisodes, lastAnimes);
mainPageObject = new MainPageObject('', headers, '', extraInfo, '', '', output);
var finalJson = JSON.stringify(mainPageObject);
savedData.innerHTML = finalJson;