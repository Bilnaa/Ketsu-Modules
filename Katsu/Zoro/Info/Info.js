function Header(key,value) {
    this.key = key;
    this.value = value;
}

function ExtraInfo(value) {
    this.value = value;
}

function Output(moduleID,image,link,title,description,genres,type,status,episodes) {
    this.moduleID = moduleID;
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.type = type;
    this.status = status;
    this.episodes = episodes;
}

function Episodes(link,moduleID,isDecodable) {
    this.link = link;
    this.moduleID = moduleID;
    this.isDecodable = isDecodable;
}

function InfoObject(request,method,headers,extraInfo,loadJavascript,javaScript,output) {
    this.request = request;
    this.method = method;
    this.headers = headers;
    this.extraInfo = extraInfo;
    this.loadJavascript = loadJavascript;
    this.javaScript = javaScript;
    this.output = output;
}

var savedData = document.getElementById('katsu-final-data');

var parsedJson = JSON.parse(savedData.innerHTML); 
  
var moduleID = 'UAFR';
var headers = [new Header('', '')];
var extraInfo = [new ExtraInfo('')];

var infoObject; 
var output;

var episodes = [];
var type = 'Anime';
var animeinfo = document.querySelector('div.anisc-info-wrap > div.anisc-info');
for (var x = 0; x < animeinfo.children.length; x++) {
    if (animeinfo.children[x].textContent.trim().includes('Status')) {
        var status = animeinfo.children[x].textContent.split('Status:')[1].trim();
    } else if (animeinfo.children[x].textContent.trim().includes('Aired')) {
        var airing = animeinfo.children[x].textContent.split('Aired:')[1].trim();
    }
}
var genres = Array.from(document.querySelectorAll('.item.item-list a')).map(g => g.textContent);
var desc = '';
try {
    desc = document.querySelector('div.anis-content > div.anisc-detail > div.film-depion.m-hide > div').textContent.trim();
} catch (e) {
    desc = document.querySelector('.anisc-info').textContent.trim();
}
var image = document.querySelector('.film-poster img').src;
if (document.querySelector('.anisc-detail h2').textContent != document.querySelector('.anisc-detail h2').dataset.jname) {
    var title = document.querySelector('.anisc-detail h2').textContent + '/' + document.querySelector('.anisc-detail h2').dataset.jname
} else {
    var title = document.querySelector('.anisc-detail h2').dataset.jname
};

console.log(moduleID,image,parsedJson.request,title,desc,genres,type,animeinfo.toString(),episodes);
output = new Output(moduleID,image,parsedJson.request,title,desc,genres,airing,status,episodes);
var json = document.querySelector('#wrapper').dataset.id;
var nextRequest = `https://zoro.to/ajax/v2/episode/list/${json}`;
infoObject = new InfoObject(nextRequest,'get',headers,extraInfo,'', '',output); 
var finalJson = JSON.stringify(infoObject);
savedData.innerHTML = finalJson;