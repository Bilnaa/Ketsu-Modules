function Resolver(request, extra, javascriptConfig, output) {
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

function Output(video) {
    this.video = video;
}

function Video(videoQuality, videoLink) {
    this.videoQuality = videoQuality;
    this.videoLink = videoLink;
}

function getNext(match, array) {
    for (var x = 0; x < array.length; x++) {
        let mMatch = array[x];
        if (mMatch.includes(match)) {
            return array[x + 1];
        }
    }
}

function unPack (code) {
	function indent (code) {
		try {
		var tabs = 0, old=-1, add='';
		for(var i=0;i<code.length;i++) {
			if(code[i].indexOf("{") != -1) tabs++;
			if(code[i].indexOf("}") != -1) tabs--;
			
			if(old != tabs) {
				old = tabs;
				add = "";
				while (old > 0) {
					add += "\t";
					old--;
				}
				old = tabs;
			}
			
			code[i] = add + code[i];
		}
		} finally {
			tabs = null;
			old = null;
			add = null;
		}
		return code;
	}
    
    var env = {
        eval: function (c) {
            code = c;
        },
        window: {},
        document: {}
    };
    
    eval("with(env) {" + code + "}");
	
	code = (code+"").replace(/;/g, ";\n").replace(/{/g, "\n{\n").replace(/}/g, "\n}\n").replace(/\n;\n/g, ";\n").replace(/\n\n/g, "\n");
	
    code = code.split("\n");
    code = indent(code);
    
    code = code.join("\n");
    return code;
} 

var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var emptyKeyValue = [new KeyValue('Referer', 'https://filemoon.to/'),
    new KeyValue('User-Agent', 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'),
];

var videos = [];
var src = '';
let scripts = document.querySelectorAll('script');
let found = '';
for (let script of scripts) {
    if (script.innerHTML.includes('p,a,c,k,e,d')) {
        found = script.innerHTML;
        break;
    }
}

let data = unPack(found);
data = data.replaceAll('\n','').replaceAll('\t','');
regex = /videop\.setup\((?<sources>.+?)}\)/g;
regRes = regex.exec(data).groups.sources;
regRes = regRes.replaceAll('\"','"').replace('loader:engine.createLoaderClass()',"loader:null");
regRes = regRes + '}';
eval("var parsed = " + regRes)
console.log(parsed)

for (let source of parsed.sources) {
    console.log(source.file)
    videos.push(new Video('Auto', new ModuleRequest(source.file, 'get', emptyKeyValue, null)));
}

let emptyExtra = new Extra([new Commands('', emptyKeyValue)], emptyKeyValue);
var chaptersObject = new Resolver(new ModuleRequest('', '', emptyKeyValue, null), emptyExtra, new JavascriptConfig(false, false, ''), new Output(videos));
var finalJson = JSON.stringify(chaptersObject);
savedData.innerHTML = finalJson;       