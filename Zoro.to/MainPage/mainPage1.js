const DefaultLayouts = {
    ultraWideFull: 'ultraWideFull',
    ultraWide: 'ultraWide',
    wideFull: 'wideFull',
    wide: 'wide',
    wideStrechedFull: 'wideStrechedFull',
    wideStrechedFullDouble: 'WideStrechedFullDouble',
    wideStreched: 'wideStreched',
    wideStrechedDouble: 'wideStrechedDouble',
    wideStrechedFullList: 'wideStrechedFullList',
    wideStrechedList: 'wideStrechedList',
    doublets: 'doublets',
    doubletsDouble: 'doubletsDouble',
    doubletsFull: 'doubletsFull',
    doubletsFullDouble: 'doubletsFullDouble',
    doubletsConstant: 'doubletsConstant',
    doubletsDoubleConstant: 'doubletsDoubleConstant',
    doubletsFullConstant: 'doubletsFullConstant',
    doubletsFullDoubleConstant: 'doubletsFullDoubleConstant',
    longDoublets: 'longDoublets',
    longDoubletsDouble: 'longDoubletsDouble',
    longDoubletsFull: 'longDoubletsFull',
    longDoubletsFullDouble: 'longDoubletsFullDouble',
    longDoubletsConstant: 'longDoubletsConstant',
    longDoubletsDoubleConstant: 'longDoubletsDoubleConstant',
    longDoubletsFullConstant: 'longDoubletsFullConstant',
    longDoubletsFullDoubleConstant: 'longDoubletsFullDoubleConstant',
    triplets: 'triplets',
    tripletsDouble: 'tripletsDouble',
    tripletsFull: 'tripletsFull',
    tripletsFullDouble: 'tripletsFullDouble',
    tripletsConstant: 'tripletsConstant',
    tripletsDoubleConstant: 'tripletsDoubleConstant',
    tripletsFullConstant: 'tripletsFullConstant',
    tripletsFullDoubleConstant: 'tripletsFullDoubleConstant',
    longTriplets: 'longTriplets',
    longTripletsDouble: 'longTripletsDouble',
    longTripletsFull: 'longTripletsFull',
    longTripletsFullDouble: 'longTripletsFullDouble',
    longTripletsConstant: 'longTripletsConstant',
    longTripletsDoubleConstant: 'longTripletsDoubleConstant',
    longTripletsFullConstant: 'longTripletsFullConstant',
    longTripletsFullDoubleConstant: 'longTripletsFullDoubleConstant',
    none: ''
};
const CellDesings = {
    Special1: 'Special1',
    Special2: 'Special2',
    Special3: 'Special3',
    CELLHelperText: 'CELLHelperText',
    small1: 'small1',
    small2: 'small2',
    normal1: 'normal1',
    normal2: 'normal2',
    normal3: 'normal3',
    normal4: 'normal4',
    normal5: 'normal5',
    normal6: 'normal6',
    normal7: 'normal7',
    wide1: 'wide1',
    wide2: 'wide2',
    wide3: 'wide3',
    wide4: 'wide4',
    wide5: 'wide5',
    wide6: 'wide6',
    wide7: 'wide7',
    wide8: 'wide8',
    wide9: 'wide9',
    wide10: 'wide10',
    wide11: 'wide11'
};
const Paging = {
    leading: 'leading',
    centered: 'centered',
    none: ''
};
const Orientation = {
    horizontal: 'horizontal',
    vertical: 'vertical'
};

function MainPage(request, extra, javascriptConfig, output) {
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

function Output(cellDesing, orientation, defaultLayout, paging, section, layout, data) {
    this.cellDesing = cellDesing;
    this.orientation = orientation;
    this.defaultLayout = defaultLayout;
    this.paging = paging;
    this.section = section;
    this.layout = layout;
    this.data = data;
}

function Section(sectionName, separator) {
    this.sectionName = sectionName;
    this.separator = separator;
}

function Layout(insets, visibleCellsWidthS, visibleCellsWidthM, visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing) {
    this.insets = insets;
    this.visibleCellsWidthS = visibleCellsWidthS;
    this.visibleCellsWidthM = visibleCellsWidthM;
    this.visibleCellsWidthL = visibleCellsWidthL;
    this.visibleCellsHeight = visibleCellsHeight;
    this.heightForVisibleCells = heightForVisibleCells;
    this.cellSize = cellSize;
    this.ratio = ratio;
    this.constant = constant;
    this.horizontalSpacing = horizontalSpacing;
    this.verticalSpacing = verticalSpacing;
}

function Insets(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
}

function Size(width, height) {
    this.width = width;
    this.height = height;
}

function Ratio(inRelation, number1, number2) {
    this.inRelation = inRelation;
    this.number1 = number1;
    this.number2 = number2;
}

function Data(image, title, description, field1, field2, field3, field4, isChapter, link, openInWebView) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.isChapter = isChapter;
    this.link = link;
    this.openInWebView = openInWebView;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
const dummyQuest = new ModuleRequest('', 'get', emptyKeyValue, null);
const streamta = new ModuleRequest('ketsuapp://?moduleData=https://raw.githubusercontent.com/Bilnaa/beta-ketsu/main/zoro.json', 'get', emptyKeyValue, null);
const infoText = new Data(dummyQuest, "Subs are only available on newer versions of Ketsu, on the Rapid-Cloud resolver and won't work if you have the App Store version.\\nClick on this message if you are using the App Store version of KETSU and not getting subtitles. If you do so don't forget to refresh this page.", '', '', '', '', '', false, streamta, false);
let output = [];
var sliderArray = [];
var slider = document.querySelectorAll('#slider .swiper-wrapper .swiper-slide');
for (slides of slider) {
    let title = slides.querySelector('img').alt;
    var image = slides.querySelector('img').dataset.src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, '');
    var link = 'https://zoro.to/' + slides.querySelector('.btn.btn-secondary.btn-radius').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, '');
    var description = slides.querySelector('.desi-depion').innerText;
    var type = slides.querySelector('div.sc-detail > div:nth-child(1)').innerText;
    var date = 'First Aired : ' + slides.querySelector('.scd-item.m-hide').innerText;
    sliderArray.push(new Data(image, type, description, title, date, '', '', false, link));
}
var TopAiring = [];
var best = document.querySelectorAll('#anime-featured > div > div > div > div:nth-child(1) > div > div.anif-block-ul > ul li');
for (list of best) {
    let title = list.querySelector('img').alt;
    var link = 'https://zoro.to/' + list.querySelector('a').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    var image = list.querySelector('img').dataset.src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    var ep = list.querySelector('span:nth-child(3)').textContent.trim();
    var language = '??';
    try {
        language = list.querySelector('span:nth-child(1)').textContent.trim();
    } catch {}
    TopAiring.push(new Data(image, title, '', ep, language, '', '', false, link));
}
var LastEpisodes = [];
var last = document.querySelectorAll('#main-content > section:nth-child(2) > div.tab-content > div > div.film_list-wrap div.flw-item');
for (list of last) {
    let title = list.querySelector('img').alt;
    var link = 'https://zoro.to/' + list.querySelector('a').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    var image = list.querySelector('img').dataset.src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
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
        language = list.querySelector('.tick.ltr').textContent.replaceAll('\\n', '').trim().replace(' ', '/').replaceAll(' ', '');
    } catch {
        language = list.querySelector('.tick.ltr');
        if (language == null) {
            language = '??';
        } else {
            language = list.querySelector('.tick.ltr').innerText.trim().replace('\\n', '/');
        }
    }
    if (list.querySelector('.fdi-item').innerText.includes('Special')) {
        ep = 'Special';
        language = '';
    }
    LastEpisodes.push(new Data(image, title, 'test1', ep, language, 'test2', 'test3', false, link));
}
var NewAnimes = [];
var newanimes = document.querySelectorAll('#main-content > section:nth-child(4) > div.tab-content > div > div.film_list-wrap div.flw-item');
for (list of newanimes) {
    let title = list.querySelector('img').alt;
    var link = 'https://zoro.to/' + list.querySelector('a').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    var image = list.querySelector('img').dataset.src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    var ep = '??';
    try {
        ep = list.querySelector('.tick.rtl').textContent.trim().replace('Ep', '').replaceAll(' ', '');
    } catch {
        ep = list.querySelector('.tick.rtl');
        if (ep == null) {
            ep = '??';
        } else {
            ep = list.querySelector('.tick.rtl').textContent.trim()
        }
    }
    var language = '??';
    try {
        language = list.querySelector('.tick.ltr').textContent.replaceAll('\\n', '').trim().replace(' ', '/').replaceAll(' ', '');
    } catch {
        language = list.querySelector('.tick.ltr');
        if (language == null) {
            language = '??';
        } else {
            language = list.querySelector('.tick.ltr').innerText.trim().replace('\\n', '/');
        }
    }
    if (list.querySelector('.fdi-item').innerText.includes('Special')) {
        ep = 'Special';
        language = '';
    }
    NewAnimes.push(new Data(image, title, '', ep, language, '', '', false, link));
}
var MostViewed = [];
var mostviewed = document.querySelectorAll('#top-viewed-day > ul > li');
for (list of mostviewed) {
    let title = list.querySelector('img').alt;
    var link = 'https://zoro.to/' + list.querySelector('a').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    var image = list.querySelector('img').dataset.src;
    image = new ModuleRequest(image, 'get', emptyKeyValue, null);
    var views = '??';
    try {
        views = list.querySelector('.fdi-item').textContent.trim();
    } catch {
        views = list.querySelector('.fdi-item');
    }
    if (views == null) {
        views = '??';
    }
    MostViewed.push(new Data(image, title, '', views, '', '', '', false, link));
}
let layout = new Layout(new Insets(0, 0, 0, 0), 1, 1, 1, 1, 0, new Size(400, 105), new Ratio('width', 4, 10), new Size(0, 0), 0, 0);
let layout1 = new Layout(new Insets(0, 0, 10, 10), 1, 1, 1, 1, 0, new Size(400, 105), new Ratio('width', 4, 10), new Size(0, 0), 0, 0);
output.push(new Output(CellDesings.Special3, Orientation.horizontal, DefaultLayouts.wideStrechedFull, Paging.leading, new Section('', true), layout, sliderArray));
output.push(new Output('CELLHelperText', Orientation.horizontal, DefaultLayouts.wideFull, Paging.centered, new Section('', true), layout1, [infoText]));
output.push(new Output(CellDesings.Special1, Orientation.horizontal, DefaultLayouts.triplets, Paging.none, new Section('Top Airing : ', true), null, TopAiring));
output.push(new Output(CellDesings.normal1, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.leading, new Section('Last Episodes: ', true), null, LastEpisodes));
output.push(new Output(CellDesings.wide6, Orientation.horizontal, DefaultLayouts.longDoubletsFull, Paging.none, new Section('New On Zoro', true), null, NewAnimes));
output.push(new Output(CellDesings.normal2, Orientation.horizontal, DefaultLayouts.longTripletsDouble, Paging.none, new Section('Most Viewed Animes', true), null, MostViewed));
var date = new Date();
var year = date.getFullYear();
var day = date.getDate();
var month = date.getMonth() + 1;
var timezoneOffset = date.getTimezoneOffset();
if (month.length != 10) {
    month = '0' + month;
}
var nextRequest = `https://zoro.to/ajax/schedule/list?tzOffset=${timezoneOffset}&date=${year}-${month}-${day}`;
let MainPageObject = new MainPage(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(MainPageObject);
savedData.innerHTML = finalJson;