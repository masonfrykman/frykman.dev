'use strict';

function makeProjectTile(name, description, status, primaryLanguage, url) {
    let outerTile = document.createElement("a");
    outerTile.classList.add("tile");

    let title = document.createElement("h2");
    title.innerText = name;

    let desc = document.createElement("p");
    desc.innerText = description;

    let ltrContainer = document.createElement("div");
    ltrContainer.classList.add("ltr-flex", "bottom")
    
    let statusElem = document.createElement("p");
    
    switch(status) {
        case "working":
            statusElem.innerHTML = "Working";
            statusElem.classList.add("status", "wip")
            break;
        case "finished":
            statusElem.innerHTML = "Finished";
            statusElem.classList.add("status", "fin");
            break;
        case "abandoned":
            statusElem.innerHTML = "Abandoned";
            statusElem.classList.add("status", "abandoned-or-other");
            break;
        default:
            statusElem.innerHTML = status;
            statusElem.classList.add("status", "abandoned-or-other");
            break;
    }
    
    let primlang = document.createElement("p");
    primlang.innerText = primaryLanguage;
    
    switch(primaryLanguage) {
        case "Dart":
            primlang.classList.add("lang", "dart");
            break;
        case "HTML/CSS/JS":
            primlang.classList.add("lang", "html");
            break;
        default:
            primlang.classList.add("status", "abandoned-or-other"); // Reuse the gray.
            break;
    }

    ltrContainer.append(statusElem, primlang);
    outerTile.append(title, desc, ltrContainer);

    outerTile.setAttribute("href", url);


    return outerTile;
}

window.onload = async () => {
    var jsonRequest = new Request(window.location.host + "/res/projects.json");

    let projectsArray = await jsonRequest.json();

    if(projectsArray === undefined) {
        // put tumbleweed.
        console.error("Failed to fetch projects JSON.");
        return;
    }

    for(var i = 0; i < projectsArray.length; i++) {
        var projectTile = makeProjectTile(projectsArray[i]["name"], 
            projectsArray[i]["description"], 
            projectsArray[i]["status"], 
            projectsArray[i]["primary-language"], 
            projectsArray[i]["url"]);
        document.getElementById("tlc").appendChild(projectTile);
    }
}