var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/Bilnaa/bilnaa.github.io/main/main/allmodules.json');
xhr.onload = function () {
    var content = xhr.responseText;
    var parsedJson = JSON.parse(content);
    if (!navigator.userAgent.match(/ipad|ipod|iphone|/i)) {
        for (var x = 0; x < parsedJson.video.length; x++) {
            let name = parsedJson.video[x].name;
            let info = parsedJson.video[x].info;
            let image = parsedJson.video[x].image;
            let link = parsedJson.video[x].link;
            let author = parsedJson.video[x].author;
            if (name.includes('FR')) {
                var moduleEle = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Auteur: ${author}</h6> <p class="card-text">${info}</p> <a href="${link}" class="btn btn-dark">Ajouter</a> </div> </div> </div> </div></div>`;
            } else {
                var moduleEle = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Author: ${author}</h6> <p class="card-text">${info}</p> <a href="${link}" class="btn btn-dark">Add</a> </div> </div> </div> </div></div>`;
            }
            document.getElementById("modulesvideos").innerHTML += moduleEle;
        }
    } else {
        for (var x = 0; x < 1; x++) {
            let name = parsedJson.video[x].name;
            let info = parsedJson.video[x].info;
            let image = parsedJson.video[x].image;
            let link = parsedJson.video[x].link;
            let author = parsedJson.video[x].author;
            var moduleEle = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Author: ${author}</h6> <p class="card-text">${info}</p> <a href="${link}" class="btn btn-dark">Add</a> </div> </div> </div> </div></div>`;
            document.getElementById("modulesvideos").innerHTML += moduleEle;
        }
    }
    for (module of parsedJson.images) {
        let name = module.name;
        let info = module.info;
        let image = module.image;
        let ketsulink = module.link;
        let zetsulink = module.Zetsu_link;
        let author = module.author;
        if (!name.includes("FR")) {
            var moduleElem = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Author: ${author}</h6> <p class="card-text">${info}</p> <a href="${ketsulink}" class="btn btn-dark">Add to Ketsu</a> <a href="${zetsulink}" class="btn btn-dark">Add to Zetsu</a> </div> </div> </div> </div> </div>`;
        } else {
            var moduleElem = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Auteur: ${author}</h6> <p class="card-text">${info}</p> <a href="${ketsulink}" class="btn btn-dark">Ajouter à Ketsu</a> <a href="${zetsulink}" class="btn btn-dark">Ajouter à Zetsu</a> </div> </div> </div> </div> </div>`;
        }
        document.getElementById("modulesimages").innerHTML += moduleElem;
    }

    for (module of parsedJson.text) {
        let name = module.name;
        let info = module.info;
        let image = module.image;
        let ketsulink = module.link;
        let zetsulink = module.Zetsu_link;
        let author = module.author;
        if (!name.includes("FR")) {
            var moduleElem = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Author: ${author}</h6> <p class="card-text">${info}</p> <a href="${ketsulink}" class="btn btn-dark">Add to Ketsu</a> <a href="${zetsulink}" class="btn btn-dark">Add to Zetsu</a> </div> </div> </div> </div> </div>`;
        } else {
            var moduleElem = `<div class="col"> <div class="card mb-3 mt-5" style="max-width: 540px;"> <div class="row g-0"> <div class="col-md-4 text-center"> <img src="${image}" class="rounded img-fluid mx-auto d-block" alt="${name}" style="padding-top: auto;"> </div> <div class="col-md-8"> <div class="card-body"> <h5 class="card-title">${name}</h5> <h6 class="card-subtitle mb-2 text-muted">Auteur: ${author}</h6> <p class="card-text">${info}</p> <a href="${ketsulink}" class="btn btn-dark">Ajouter à Ketsu</a> <a href="${zetsulink}" class="btn btn-dark">Ajouter à Zetsu</a> </div> </div> </div> </div> </div>`;
        }
        document.getElementById("modulesimages").innerHTML += moduleElem;
    }
}
xhr.send();
