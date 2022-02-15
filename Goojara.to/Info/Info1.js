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

 function getValueFromKey(keys, key) {
     for (var x = 0; x < keys.length; x++) {
         let tKey = keys[x];
         if (tKey.key == key) {
             return tKey.value;
         }
     }
 }
 var savedData = document.getElementById('ketsu-final-data');
 var parsedJson = JSON.parse(savedData.innerHTML);
 let emptyKeyValue = [new KeyValue('', '')];
 var episodes = [];
 type = 'Serie';
 var image = parsedJson.output.image;
 var title = parsedJson.output.title;
 var desc = parsedJson.output.description;
 var genres = parsedJson.output.genres;
 var extraInfo = parsedJson.extra.extraInfo;
 var chapters = document.querySelectorAll('#seon .seho');
 for (var i = 0; i < chapters.length; i++) {
     var element = chapters[i];
     var fixedLink = 'https://goojara.to' + element.querySelector('h1 a').href;
     var episodeName = element.querySelector('div.seep').innerText.trim().replace('\n', ' -') + ' - ' + element.querySelector('h1 a').innerText.trim();
     let chapter = new Chapter(episodeName, new ModuleRequest(fixedLink, 'get', emptyKeyValue, null), false);
     parsedJson.output.chapters.push(chapter);
 }
 var actualCount = getValueFromKey(extraInfo, 'count');
 var nextCount = parseInt(actualCount) + 1;
 var nextRequest = getValueFromKey(extraInfo, nextCount);
 extraInfo[0].value = '' + (parseInt(actualCount) + 1);
if (nextRequest == undefined) {
    nextRequest = '';
}
 let infoPageObject = new Info(new ModuleRequest(nextRequest, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], emptyKeyValue), new JavascriptConfig(true, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, '', type, 'Eps: ' + episodes.length, episodes));
 var finalJson = JSON.stringify(infoPageObject);
 savedData.innerHTML = finalJson;