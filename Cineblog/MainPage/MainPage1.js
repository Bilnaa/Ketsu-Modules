const DefaultLayouts = {
    ultraWideFull : 'ultraWideFull',
    ultraWide : 'ultraWide',
    wideFull : 'wideFull',
    wide : 'wide',
    wideStrechedFull : 'wideStrechedFull',
    wideStrechedFullDouble : 'WideStrechedFullDouble',
    wideStreched : 'wideStreched',
    wideStrechedDouble : 'wideStrechedDouble',
    wideStrechedFullList : 'wideStrechedFullList',
    wideStrechedList : 'wideStrechedList',

    doublets : 'doublets',
    doubletsDouble : 'doubletsDouble',
    doubletsFull : 'doubletsFull',
    doubletsFullDouble : 'doubletsFullDouble',
    doubletsConstant : 'doubletsConstant',
    doubletsDoubleConstant : 'doubletsDoubleConstant',
    doubletsFullConstant : 'doubletsFullConstant',
    doubletsFullDoubleConstant : 'doubletsFullDoubleConstant',
    
    longDoublets : 'longDoublets',
    longDoubletsDouble : 'longDoubletsDouble',
    longDoubletsFull : 'longDoubletsFull',
    longDoubletsFullDouble : 'longDoubletsFullDouble',
    longDoubletsConstant : 'longDoubletsConstant',
    longDoubletsDoubleConstant : 'longDoubletsDoubleConstant',
    longDoubletsFullConstant : 'longDoubletsFullConstant',
    longDoubletsFullDoubleConstant : 'longDoubletsFullDoubleConstant',
    
    triplets : 'triplets',
    tripletsDouble : 'tripletsDouble',
    tripletsFull : 'tripletsFull',
    tripletsFullDouble : 'tripletsFullDouble',
    tripletsConstant : 'tripletsConstant',
    tripletsDoubleConstant : 'tripletsDoubleConstant',
    tripletsFullConstant : 'tripletsFullConstant',
    tripletsFullDoubleConstant : 'tripletsFullDoubleConstant',
    
    longTriplets : 'longTriplets',
    longTripletsDouble : 'longTripletsDouble',
    longTripletsFull : 'longTripletsFull',
    longTripletsFullDouble : 'longTripletsFullDouble',
    longTripletsConstant : 'longTripletsConstant',
    longTripletsDoubleConstant : 'longTripletsDoubleConstant',
    longTripletsFullConstant : 'longTripletsFullConstant',
    longTripletsFullDoubleConstant : 'longTripletsFullDoubleConstant',
    
    none: ''
};
    
const CellDesings = {
    Special1 : 'Special1',
    Special2 : 'Special2',
    Special3 : 'Special3',
    CELLHelperText : 'CELLHelperText',

    small1 : 'small1',
    small2 : 'small2',
    normal1 : 'normal1',
    normal2 : 'normal2',
    normal3 : 'normal3',
    normal4 : 'normal4',
    normal5 : 'normal5',
    normal7 : 'normal7',
    
    wide1 : 'wide1',
    wide2 : 'wide2',
    wide3 : 'wide3',
    wide4 : 'wide4',
    wide5 : 'wide5',
    wide6 : 'wide6',
    wide7 : 'wide7',
    wide8 : 'wide8',
    wide9 : 'wide9',
    wide10 : 'wide10',
    wide11 : 'wide11'
    };
    
const Paging = { leading : 'leading', centered : 'centered', none : '' };
const Orientation = { horizontal : 'horizontal', vertical : 'vertical' };
    
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
function Data(image, title, description, field1, field2, field3, field4, isChapter, link,openInWebView) {
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
    
var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML); 
const emptyKeyValue = [new KeyValue('','')];

const url = parsedJson.request.url.split('/cinema')[0].split('/film')[0];
var output = parsedJson.output;
var dataArray = [];

for (movie of document.querySelectorAll('.short.block-list')) {
    let img = url + movie.querySelector('img').getAttribute('data-src').replace('46x57', '200x300');
    img = new ModuleRequest(img, 'get', emptyKeyValue, null);
    let title = movie.querySelector('a').title;
    
    let desc = movie.querySelector('.story').textContent.trim();
    let genres = movie.querySelector('.text-uppercase b').textContent;
    let imdb = movie.querySelector('.short-imdb span').textContent+'/10';

    let link = movie.querySelector('a').href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    dataArray.push(new Data(img, title, desc, genres, imdb, '', '', false, link));
}
output.push(new Output(CellDesings.wide11,Orientation.vertical, DefaultLayouts.wideFull, Paging.leading, new Section('', true), null, dataArray));

const mainPageObject = new MainPage(new ModuleRequest(parsedJson.request.url.replace('cinema', 'film'),'get',emptyKeyValue,null),new Extra([new Commands('',emptyKeyValue)],emptyKeyValue),new JavascriptConfig(true,false,''),output);
console.log(mainPageObject)

savedData.innerHTML = JSON.stringify(mainPageObject);