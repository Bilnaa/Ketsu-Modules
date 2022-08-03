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

function Search(request, extra, separator, javascriptConfig, output) {
    this.request = request;
    this.extra = extra;
    this.separator = separator;
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

function quickData(link, image, title, field1) {
    return new Data(image, title, 'unknown', field1, 'unknown', 'unknown', 'unknown', false, link);
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
var finalData = '';
const nineAnimeKey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
const cipherKey = "kMXzgyNzT3k5dYab"

function getVrf(text){
  return encodeURIComponent(encrypt(cipher(cipherKey, encodeURIComponent(text)), nineAnimeKey))
}
function encrypt(t) {
    var h = nineAnimeKey;
    var i = '';
    for (t = ''.concat(t), r = 0; r < t.length; r++) {
        if (255 < t.charCodeAt(r)) {
            return null;
        }
        for (var i = '', r = 0; r < t.length; r += 3) {
            var u = [void 0, void 0, void 0, void 0];
            u[0] = t.charCodeAt(r) >> 2, u[1] = (3 & t.charCodeAt(r)) << 4, t.length > r + (1) && ((u[1] |= t
                .charCodeAt(r + 1) >> 4, u[2] = (15 & t.charCodeAt(r + 1)) << 2), u[2] = (15 & t
                .charCodeAt(r + 1)) << 2), t.length > r + (2) && (u[2] |= t.charCodeAt(r + 2) >> 6, u[3] =
                63 & t.charCodeAt(r + 2));
            for (var e = 0; e < u.length; e++) {
                'undefined' == typeof u[e] ? i += '=' : i += function (t) {
                    if (0 <= t && t < 64) {
                        return h[t];
                    }
                }(u[e]);
            }
        }
    }
    return i;
};

function cipher(key, text) {
    var arr = new Array(256);
    for (var i = 0; i < 256; i++) {
        arr[i] = i;
    }
    var u = 0;
    var r;
    for (var i = 0; i < 256; i++) {
        u = (u + arr[i] + key[i % key.length].charCodeAt(0)) % 256;
        r = arr[i];
        arr[i] = arr[u];
        arr[u] = r;
    }
    u = 0;
    var c = 0;
    return text.split('').map(function (j) {
        c = (c + 1) % 256;
        u = (u + arr[c]) % 256;
        r = arr[c];
        arr[c] = arr[u];
        arr[u] = r;
        return String.fromCharCode(j.charCodeAt(0) ^ arr[(arr[c] + arr[u]) % 256]);
    }).join('');
}
let output = [];
let results = [];
let emptyKeyValue = [new KeyValue('', '')];
let newRequest = new ModuleRequest('', '', emptyKeyValue, null);
let urlRequest = parsedJson.request.url.replace('amp;', '');
if (!urlRequest.includes('vrf=')) {
    let keyword = new URL(urlRequest).searchParams.get('keyword');
    let page = new URL(urlRequest).searchParams.get('page');
    let origin = new URL(urlRequest).origin;
    let keywordEnc = getVrf(keyword);
    newRequest = new ModuleRequest(`${origin}/filter?keyword=${keyword.replace(/\s/g, '+')}&vrf=${encodeURIComponent(keywordEnc)}&page=${page}`, 'get', emptyKeyValue, null);
} else {
    const animeList = document.querySelectorAll('.ani.items > .item');
    for (const anime of animeList) {
        const title = anime.querySelector('img').alt;
        let link = anime.querySelector('.name').href;
        link = new URL(link, parsedJson.request.url).href;
        link = new ModuleRequest(link, 'get', emptyKeyValue, null);
        let image = anime.querySelector('img').src;
        image = new ModuleRequest(image, 'get', emptyKeyValue, null);
        let lang = '';
        let epiStatus = anime.querySelectorAll('.ep-status');
        if (epiStatus.length == 3) {
            lang = 'SUB/DUB';
        } else if (epiStatus.length == 2) {
            let array = [];
            for (div of epiStatus) {
                if (div.className.includes('sub')) {
                    array.push('SUB');
                } else if (div.className.includes('dub')) {
                    array.push('DUB');
                }
            }
            lang = array.join('/');
        } else {
            lang = 'SUB';
        }
        var total = '';
        var type = anime.querySelector('.ani.poster.tip .meta .inner .right').textContent.trim();
        try {
            total = 'Episode ' + anime.querySelector('.ep-status.total').textContent.trim() + ' ';
        } catch (error) {
            total = '';
            console.log(error);
        }
        const obj = new Data(image, title + ' ' + type, total + lang, '', '', 'unknown', 'unknown', false, link, false);
        results.push(obj);
    }
    var testLayout = new Layout(new Insets(10, 10, 10, 10), 1, 2, 3, 1, 500, new Size(400, 400), new Ratio('width', 4, 11), new Size(0, 0), 10, 10);
    output.push(new Output(CellDesings.wide8, Orientation.vertical, DefaultLayouts.none, Paging.none, new Section('', true), testLayout, results));
}
let searchPageObject = new Search(newRequest, new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), '', new JavascriptConfig(true, false, ''), output);
var finalJson = JSON.stringify(searchPageObject);
savedData.innerHTML = finalJson;