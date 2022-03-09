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
var moduleID = '114653268923213246';
var headers = [new Header('', '')];
var extraInfo = [new ExtraInfo('')];
var searchPageObject;
var output = [];
try {
    var field1 = document.querySelector('#ani_detail > div > div > div.anis-content > div.anisc-detail > div.film-stats').innerText.trim().replaceAll('\\n', ' ')
} catch (e) {
    var field1 = document.querySelector('#ani_detail > div > div > div.anis-content > div.anisc-detail > div.film-stats').innerText.trim()
};
if (field1.includes('TV')) {
    var type = 'TV';
} else if (field1.includes('Movie')) {
    var type = 'Movie'
} else {
    var type = 'Unknown'
};
var shorts = document.querySelectorAll('.film_list-wrap .flw-item');
for (short of shorts) {
    try {
        language = short.querySelector('.tick.ltr').textContent.replaceAll('\\n', '').trim().replace(' ', '/').replaceAll(' ', '');
    } catch {
        language = short.querySelector('.tick.ltr');
        if (language == null) {
            language = '??';
        } else {
            language = short.querySelector('.tick.ltr').innerText.trim().replace('\\n', '/');
        }
    }
    var image = short.querySelector('img').getAttribute('data-src');
    var field1 = short.querySelector('.tick-item.tick-eps').textContent.trim();
    var link = 'https://zoro.to/' + short.querySelector('a').href;
    var title = short.querySelector('img').alt;
    output.push(new Output(moduleID, image, link, title, type, language, field1));
}
searchPageObject = new SearchObject('', '', headers, '+', extraInfo, '', '', output);
var finalJson = JSON.stringify(searchPageObject);
savedData.innerHTML = finalJson;