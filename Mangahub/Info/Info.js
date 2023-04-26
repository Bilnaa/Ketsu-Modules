try {

    /* JAVASCRIPT STARTS */  

// SCROLL TO LINE 100 TO START CODING.


/**
* @param {ModuleRequest} request
* @param {Extra} extra  
* @param {JavascriptConfig} javascriptConfig 
* @param {Output} output 
*/
function Info ( request, extra, javascriptConfig, output ) {
this.request = request;
this.extra = extra;
this.javascriptConfig = javascriptConfig;
this.output = output;
}
/**
* @param {string} url
* @param {string} method  
* @param {KeyValue[]} headers 
* @param {string} [httpBody] 
*/
function ModuleRequest ( url, method, headers, httpBody ) {
this.url = url;
this.method = method;
this.headers = headers;
this.httpBody = httpBody;
}
/**
* @param {Commands[]} commands
* @param {KeyValue[]} extraInfo 
*/
function Extra ( commands, extraInfo ) {
this.commands = commands;
this.extraInfo = extraInfo;
}
/**
* @param {string} commandName
* @param {KeyValue[]} params 
*/
function Commands ( commandName, params ) {
this.commandName = commandName;
this.params = params;
}
/**
* @param {boolean} removeJavascript
* @param {boolean} loadInWebView 

*/
function JavascriptConfig ( removeJavascript, loadInWebView ) {
this.removeJavascript = removeJavascript;
this.loadInWebView = loadInWebView;
this.javaScript = "";
}
/**
* @param {string} key
* @param {string} value 
*/
function KeyValue ( key, value ) {
this.key = key;
this.value = value;
}
/**
* @param {string} chapName
* @param {ModuleRequest} link
* @param {boolean} openInWebView
*/
function Chapter ( chapName, link, openInWebView ) {
this.chapName = chapName;
this.link = link;
this.openInWebView = openInWebView;
}
/**
* @param {ModuleRequest} image
* @param {ModuleRequest} link -This needs to be the url of the first request. If you only have one requests you can do parsedJson.request
* @param {string} title
* @param {string} description
* @param {string[]} genres
* @param {string} field1
* @param {string} field2
* @param {string} field3
* @param {string} field4
* @param {Chapter[]} chapters
*/
function Output ( image, title, link, description, genres, field1, field2, field3, field4, chapters ) {
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

/*
CODE STARTS HERE: 

- What you need to do is to create a Info Object and save it as a json string on the div with the id: ketsu-final-data, to be more precise the one saved on the variable called savedData below this comment.

- Most of the code is already done, you just need to fill the output variable with an Output object.
*/


var savedData = document.getElementById( 'ketsu-final-data' );
var parsedJson = JSON.parse( savedData.innerHTML );
var emptyKeyValue = [ new KeyValue( '', '' ) ];


var episodes = [];
var type = 'empty';
var status = '';
var genres = [];
var desc = '';
var title = '';
var image = '';
var inf = document.querySelectorAll('._3owCZ.col-md-9.col-sm-8.col-xs-6 span');
status = inf[5].textContent.trim();
genres = Array.from(document.querySelectorAll('._3Czbn a')).map(o=>o.textContent);
desc = document.querySelector('.ZyMp7').textContent.trim();
title = document.querySelector('._3xnDj').textContent.trim();
image = document.querySelector('._4RcEi.col-md-3.col-sm-4.col-xs-6 img').src;
image = new ModuleRequest(image,'get',emptyKeyValue,null);
var dats = document.querySelectorAll('.tab-content ul li');
for (d of dats){
var chap = 'Chapter '+ d.querySelector('.text-secondary._3D1SJ').textContent.replace('#','').trim();
var link = d.querySelector('._3pfyN').href;
let ok = new Chapter(chap, new ModuleRequest(link, 'get', emptyKeyValue, null), false);
episodes.push(ok);
}

let infoPageObject = new Info(new ModuleRequest('', '', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(false, false, ''),
new Output(image, title, parsedJson.request, desc, genres, status,'Manga', type, 'Eps: '  + episodes.length, episodes.reverse()));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;
/* JAVASCRIPT ENDS */

} catch (e) {
    console.error(e.message);

    if (typeof KETSU_ASYNC !== 'undefined') {
        window.webkit.messageHandlers.EXECUTE_KETSU_ASYNC.postMessage('');
    }

}