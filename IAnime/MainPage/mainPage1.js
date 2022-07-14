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
     normal6 : 'normal6',
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

   const Paging = {
       leading : 'leading',
       centered : 'centered',
       none : ''
   };

   const Orientation = {
       horizontal : 'horizontal',
       vertical : 'vertical'
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

   function Layout(insets, visibleCellsWidthS,visibleCellsWidthM,visibleCellsWidthL, visibleCellsHeight, heightForVisibleCells, cellSize, ratio, constant, horizontalSpacing, verticalSpacing) {
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

   function quickData(link,image,title,field1)  {
       return new Data(image,title,'unknown',field1,'unknown','unknown','unknown',false,link);
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
   var donnes = [];
   let output = [];
   let emptyKeyValue = [new KeyValue('','')];
   var page  = [
       'Xdf789POGg45rrty','Wqs418Rtbsdfg7987ds','QQo447FFtxvxw7987','Qxc108FGkpodhjccjv','SpS891Ntpztzret87ty',
       'BoR851UkN56456uui','Xod038Fbzfghfdh87df','ADs480FvP01121j','ApG097Bgtzrte787dfg','Wup331BgFuytt788o', 
       'Pvi726Butcvbqs45re','Vja882Gptlklgjjk','Foo00451xcv45fdtyr','CbO016Dxmipoifdg5456','Kpy369Mbvzzret7987',
       'Jpr104Gol654rtetfgh','PdR780Bop78ret89z7g','Bss541Lky987ljhlgh2313s','Mvp442Srifdsg7987sdg','Nrs598Ftp87rfdxgxd8',
       'Mer710Gnr132654987','Cof591Fopoiup87uipou','Qop487Rdtkmlkfgh5646aze','Jsa419Ygpazer878fdsd','Bod452VViiuher8787fd',
       'Rij126Prtezrt5454sdfg'
   ];
   var nump = page[Math.floor(Math.random() * page.length)];
   var urlmodi =`https://www.ianimes.org/listing2.php?affichage=${nump}&b1u3vv0lSorJk9Lex0tbKZEtbz8RlMC9`;
   const rien = new ModuleRequest('', 'get', emptyKeyValue, null);
   var lien = new ModuleRequest('https://bilnaa.github.io/main/','get', emptyKeyValue, null);
   var contact = new Data(rien, 'Vous pouvez parcourir la liste des films de façon aléatoire en actualisant la page acceuil .Pour faire cela, vous devez tirer du haut vers le bas la page acceuil.\\nVous pouvez ajouter des modules en cliquant sur ce texte.\\nAllez bon visionnage 😉.\\nDanyspb','','','','','',false,lien,false);

   var cherch = document.querySelectorAll('#showcase-holder .showcase .showcase-slide');
   for (r of cherch){
       var mg = r.querySelector('.showcase-content :nth-child(1)').style.backgroundImage.substr(5);
       var image = mg.split(')')[0].trim().replace('\"','');
       image = new ModuleRequest(image, 'get', emptyKeyValue, null);
       var title = r.querySelector('.showcase-caption center titre6').textContent.trim();
       var type = r.querySelector('.showcase-caption center:nth-child(2) titre6 font:nth-child(2)').textContent.trim();
       var link = r.querySelector('.showcase-content a').href;
       link = new ModuleRequest(link, 'get', emptyKeyValue, null);
       donnes.push(new Data(image, '', '',title,type,'','',false,link));
   }

   let layout = new Layout(new Insets(0, 0, 0, 0), 1, 1, 1, 1, 0, new Size(430, 105), new Ratio('width', 6, 10), new Size(0, 0), 0, 0);
   let layout1 = new Layout(new Insets(0, 0, 10, 10), 1, 1, 1, 1, 0, new Size(400, 105), new Ratio('width', 4, 10), new Size(0, 0), 0, 0);

   output.push(new Output(CellDesings.Special3, Orientation.horizontal, DefaultLayouts.wideStrechedFull, Paging.leading,new Section('', true), layout, donnes));
   output.push(new Output('CELLHelperText', Orientation.horizontal, DefaultLayouts.wideFull, Paging.centered, new Section('', true), layout1, [contact]));
   let MainPageObject = new MainPage(new ModuleRequest(urlmodi,'get',emptyKeyValue,null),new Extra([new Commands('',emptyKeyValue)],emptyKeyValue),new JavascriptConfig(true,false,''),output);
   var finalJson = JSON.stringify(MainPageObject);
   savedData.innerHTML = finalJson;