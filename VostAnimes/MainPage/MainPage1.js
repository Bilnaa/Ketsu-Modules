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
    
var output = [];

for (section of document.querySelector('main').querySelectorAll('section')) {
    var design = CellDesings.normal1;
    var orient = Orientation.horizontal;
    var layout = DefaultLayouts.longDoubletsConstant;
    
    var dataArray = [];
    var sectionName = section.querySelector('.Top').textContent.trim().split('\\n')[0];
    
    for (container of section.querySelector('ul').querySelectorAll('li > article')) {
        let image = container.querySelector('img').getAttribute('data-src');
        if (!image.includes('https:')) { image = 'https:'+image }
        image = new ModuleRequest(image, 'get', emptyKeyValue, null);
        let title = container.querySelector('.Title').textContent;
        let year = '';
        try { year = container.querySelector('.Year').textContent.split(' -')[0]; } catch{}
        let nb = '';
        try { nb = container.querySelector('figcaption').textContent.trim().replace(' - ', ' '); } catch{}
        let link = container.querySelector('a').href.split('-saison')[0].replace('Episod', 'anim').replace('Season', 'anime');
        link = new ModuleRequest(link, 'get', emptyKeyValue, null);
        dataArray.push(new Data(image, title, '', nb, year, '', '', false, link));
    }
    if (sectionName.includes('pisode')) {
        design = CellDesings.wide6;
        layout = DefaultLayouts.wide;
    } else if (sectionName.includes('animes')) {
        orient = Orientation.vertical;
        layout = DefaultLayouts.longTripletsFullConstant;
    }
    output.push(new Output(design, orient, layout, Paging.leading, new Section(sectionName, true), null, dataArray));
}
const mainPageObject = new MainPage(new ModuleRequest('','get',emptyKeyValue,null),new Extra([new Commands('',emptyKeyValue)],emptyKeyValue),new JavascriptConfig(true,false,''),output);

savedData.innerHTML = JSON.stringify(mainPageObject);