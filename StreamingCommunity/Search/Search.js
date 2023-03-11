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

function Search(request,extra,separator,javascriptConfig,output) {
    this.request = request;
    this.extra = extra;
    this.separator = separator;
    this.javascriptConfig = javascriptConfig;
    this.output  = output;
}
function ModuleRequest(url,method,headers,httpBody) {
    this.url = url;
    this.method = method;
    this.headers  = headers;
    this.httpBody = httpBody;
}
function Extra(commands,extraInfo) {
    this.commands = commands;
    this.extraInfo = extraInfo;
}
function Commands(commandName,params) {
    this.commandName = commandName;
    this.params = params;
}
function JavascriptConfig(removeJavascript,loadInWebView,javaScript) {
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}
function KeyValue(key,value) {
    this.key = key;
    this.value = value;
}
function Output(cellDesing,orientation,defaultLayout,paging,section,layout,data) {
    this.cellDesing = cellDesing;
    this.orientation  = orientation;
    this.defaultLayout = defaultLayout;
    this.paging = paging;
    this.section  = section;
    this.layout = layout;
    this.data = data;
}
function Section(sectionName,separator) {
    this.sectionName  = sectionName;
    this.separator = separator;
}
function Data(image,title,description,field1,field2,field3,field4,isChapter,link,openInWebView) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.isChapter  = isChapter;
    this.link = link;
    this.openInWebView = openInWebView;
}

var savedData = document.getElementById('ketsu-final-data');
const parsedJson = JSON.parse(savedData.innerHTML); 
const emptyKeyValue = [new KeyValue('','')];

const type = parsedJson.request.url.includes('.io') ? 'Film':'Serie';
const filmSerie = {
    'Film': {
        'title': '.title-name > a',
        'link': '.title-name > a',
        'field1': '.title-desc > span:nth-child(2)',
        'defaultLayouts': DefaultLayouts.doubletsFullDouble,
    },
    'Serie': {
        'title': '.title-2',
        'link': 'a',
        'field1': '.enum',
        'defaultLayouts': DefaultLayouts.longDoubletsFullDouble,
    }
}[type];

var output = parsedJson.output;
var searchArray = [];

var elements = document.querySelectorAll('.slider-tile');
for (let el of elements) {
    var img = parsedJson.request.url.split('/index')[0] + el.querySelector('img').getAttribute('data-src');
    img = new ModuleRequest(img, 'get', emptyKeyValue, null);
        
    let title = el.querySelector(filmSerie['title']).textContent.trim();

    let field1 = el.querySelector(filmSerie['field1']).textContent.trim();

    let link = el.querySelector(filmSerie['link']).href;
    link = new ModuleRequest(link, 'get', emptyKeyValue, null);
    searchArray.push(new Data(img,title,'',field1,'','','',false,link));
}
output.push(new Output(CellDesings.normal1,Orientation.vertical,filmSerie['defaultLayouts'],Paging.leading, new Section(type, true), null, searchArray));

const searchPageObject = new Search(new ModuleRequest(parsedJson.request.url.replace('.io', '.gratis'),'get',emptyKeyValue,null),new Extra([new Commands('',emptyKeyValue)],emptyKeyValue),'%20',new JavascriptConfig(true,false,''), output);

savedData.innerHTML = JSON.stringify(searchPageObject);