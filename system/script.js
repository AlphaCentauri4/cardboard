const animated = document.querySelector("#loadbar");
animated.onanimationend = () => {
document.getElementById('loadbar').style.animation="endLoad .5s ease-out 1 forwards";};

var timer1;
var timer2;
// view, study
var curMode = 0;
var curSubmode = 0;
var curPathList = [""];
var curPathString = "";
var prevPaths = ["f/home"];
var iteration = 0;
var fileShape;

var loadState = false;

window.onresize = changeNavWidth;

window.onscroll = scroll;

function scroll() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  // console.log(scrolled)
  if (scrolled == 0 || isNaN(scrolled)) {
    document.getElementById("header").style.boxShadow = "none"
  } else {
    document.getElementById("header").style.boxShadow = "0px 0px 10px 5px #c8c8c8";
  }
}

function changeNavWidth() {
  let width = window.innerWidth;
  document.getElementById("leftNavDIV").style.width = (width - 240) + "px";
  document.getElementById("viewPort").style.width = (width - 230) + "px";
}

function loadJSON(path, success, error) {
  scroll();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log("Success");
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
timer1 = setTimeout(onSlow, 10000);
timer2 = setTimeout(onFail, 20000);
xhr.open('GET', "https://1-cardboard.alphacentauri4.repl.co" + path, false);
xhr.send();
}

function startLoadAnimation() {
  document.getElementById('loadbar').style.animation="loading 1.5s linear 1";
  if (loadState == false) {
    stopLoadAnimation(true)
  } else {
  setTimeout(startLoadAnimation, 1000);
  loadState = true;
  // console.log("Loop started")
  }
  
}
function stopLoadAnimation(action) {
  if (action) {
  document.getElementById('loadbar').style.animation = "loading 0s linear 0"; 
  document.getElementById('loadbar').style.animation="endLoad .5s ease-out 1 forwards";
  document.getElementById('loadbar').style.backgroundColor="#1f598e";
  // console.log("Load ended")
  } else {
    loadState = false
  }
  
}

function onLoad(data){
  clearTimeout(timer1)
  clearTimeout(timer2)
  stopLoadAnimation();
  filePathManager(data);

}

function onSlow() {
  // document.getElementById('loadbar').style.backgroundColor="#f07941";
//#eb5610
}

function onFail() {
  // console.log("failed");
// document.getElementById('loadbar').style.backgroundColor="#eb1f10";
// document.getElementById('loadbar').style.animation = "loading 0s linear 0"; 
// document.getElementById('loadbar').style.animation="endLoad .5s ease-out 1 forwards";
}

function modeManager(mode, submode = 0, redirect = true) {
for (i=0; i<2; i++) {
  document.getElementsByClassName("modeButtonDIV")[i].style.backgroundColor = "white";
  document.getElementsByClassName("modeButton")[i].style.filter = "invert(28%) sepia(2%) saturate(12%) hue-rotate(314deg) brightness(97%) contrast(91%)";
  document.getElementsByClassName("modeText")[i].style.color= "#646464";
}
for (i=0; i<2; i++) {
  document.getElementsByClassName("dropdownElmt")[i].style.backgroundColor = "white";
  document.getElementsByClassName("dropdownImg")[i].style.filter = "invert(28%) sepia(2%) saturate(12%) hue-rotate(314deg) brightness(97%) contrast(91%)";
  document.getElementsByClassName("dropdownText")[i].style.color= "#646464";
}
  document.getElementsByClassName("modeButtonDIV")[mode].style.backgroundColor = "#e5f5ff";
  document.getElementsByClassName("modeButton")[mode].style.filter = "invert(17%) sepia(43%) saturate(5696%) hue-rotate(212deg) brightness(90%) contrast(92%)";
  document.getElementsByClassName("modeText")[mode].style.color = "#0a49a8";
  document.getElementsByClassName("dropdownElmt")[submode].style.backgroundColor = "#e5f5ff";
  document.getElementsByClassName("dropdownImg")[submode].style.filter = "invert(17%) sepia(43%) saturate(5696%) hue-rotate(212deg) brightness(90%) contrast(92%)";
  document.getElementsByClassName("dropdownText")[submode].style.color = "#0a49a8";
  document.getElementById("dropdownSlider").style.top = (6 + 32*submode) + "px";
  var locationList = [["termMain.html", "termContent.html"]];
  console.log(true)
  if (redirect){
    console.log(locationList[mode][submode])
  window.open("https://1-cardboard.alphacentauri4.repl.co/" + locationList[mode][submode], "_self")
  }
}

// function fileDisplayManager(destination) {
//   filePathDisplayManager(destination);
//   loadJSON()
// }

// function filePathDisplayManager(destination) {
//   document.getElementById("navPath").innerHTML = "";
//   for (i=0; i<destination.length; i++) {
//     document.getElementById("navPath").innerHTML += '<p class="navPathLocation">AP Government</p><p class="navPathLocation">›</p>'
//   }
// }

function filePathManager(path) {
  loadState = true;
  startLoadAnimation()
  
  // console.log(path)
  var locationName = path.locationName;
  var locationPath = path.locationPath;
  // var locationPath = path.locationPath;
  document.getElementById("navPath").innerHTML = "";
  for (i=0; i<locationName.length; i++) {
    document.getElementById("navPath").innerHTML += '<p class="navPathLocation" onclick="filePathStart(' + "['" + locationPath[i]  + "']" + ')">' + locationName[i] + '</p><p class="navPathLocation">›</p>'
  }
  var fileName = path.fileNames;
  var filePath = path.filePaths;
  var fileAccents = path.fileAccents;
  fileShape = path.fileShape;
  var fileClips = path.fileClips;
  var description = path.description;
  document.getElementById("viewPort").innerHTML = "";
  if (fileShape[0] == "list") {
    document.getElementById("description").innerHTML = description;
  } else {
    document.getElementById("description").innerHTML = "";
  }
  iteration = 0;
  for (i=0; i<fileName.length; i++) {
    if (fileShape[0] == "clip") {
      document.getElementById("viewPort").style.display = "block";
      document.getElementById("viewPort").innerHTML += '<div class="clipFile" onclick="filePathStart(' + "['" + filePath[i] + "']" + ')"><img src="/system/subjectWhite.svg" class="clipTypeImg" style="background-color: ' + fileAccents[i] + '"><p class="clipTitle">' + fileName[i] + '</p><img src="' + fileClips[i] + '" class="clipClip"></div>'
    } else if (fileShape[0] == "simple") {
      document.getElementById("viewPort").style.display = "block";
      document.getElementById("viewPort").innerHTML += '<div class="simpleFile" onclick="filePathStart(' + "['" + filePath[i] + "']" + ')"><img src="/system/folder.svg" class="simpleTypeImg" style="filter: ' + fileAccents[i] + '"><p class="simpleTitle">' + fileName[i] + '</p></div>'
    } else if (fileShape[0] == "list") {
      iteration = i;
      document.getElementById("viewPort").style.display = "block";
      loadJSON("/files/" + filePath[i].slice(2, filePath[i].length) + ".json", fileRedirect, onFail);
    }
  }
  if (fileShape[0] == "simple" || fileShape[0] == "clip") {
    stopLoadAnimation();
  }
}

function fileRedirect(json) {
  displayFile(json);
}

function displayDescription(json) {
  var description = json.description;
  // console.log("JSON --------------------------------------")
  // console.log(json)
  document.getElementById("description").innerHTML = description;
}

function displayFile(json) {
  clearTimeout(timer1)
  clearTimeout(timer2)
  var fileName = json.locationPath;
  var title = json.title;
  var image = json.image;
  var summary = json.summary;
  var content = json.content;
  var define = json.define;
  // console.log(content)
  if (content.length != 0) {
    // console.log("FALSE_____________________________")
    // console.log(content.length)
    var bullets = "<ul>";
    for (j=0; j<content.length; j++) {
      // console.log("loop")
      bullets += "<li>" + content[j] + "</li>";
    }
    bullets += "</ul>"
    // console.log(bullets)
    // bullets = bullets.replace(/\[/g, "<span class='define' onmouseover='define(event)'>");
    // bullets = bullets.replace(/\]/g, "</span>")
    bullets = insertDefinitions(bullets)
    summary = insertDefinitions(summary)
    document.getElementById("viewPort").innerHTML += '<div class="viewModeContainer" ><div class="termContainer"><h2 class="termText">' + title + '</h2></div><div class="summaryContainer"><p class="summaryText">' + summary + '</p></div><div class="contentContainer" style="overflow: scroll;"><div class="contentText">' + 
  bullets +'</div></div><div class="dividerLine"></div>';}
  else {
    // console.log("TRUE_____________________________")
    document.getElementById("viewPort").innerHTML += '<div class="viewModeContainer" ><div class="termContainer"><h2 class="termText">' + title + '</h2></div><div class="summaryContainer"><p class="summaryText">' + summary + '</p></div><div class="contentContainer" style="overflow: visible;"><div class="contentText">' + '<p class="nothing">Nothing to see here</p></div></div><div class="dividerLine"></div>'
  }
  
//   var bullets = "<ul>";
//   for (j=0; j<content.length; j++) {
//     console.log("loop")
//     bullets += "<li>" + content[j] + "</li>";
//   }
//   bullets += "</ul>"
//   console.log(bullets)
//   console.log("ITERATION: " + iteration);
//   console.log(content.length)
// // bullets +'</div></div><div class="dividerLine"></div>';
//   document.getElementById("viewPort").innerHTML += '<div class="viewModeContainer"><div class="termContainer"><h2 class="termText">' + title + '</h2></div><div class="summaryContainer"><p class="summaryText">' + summary + '</p></div><div class="contentContainer"><div class="contentText">' + 
// bullets +'</div></div><div class="dividerLine"></div>';
  stopLoadAnimation();
}

function insertDefinitions(bullets) {
  var word = "";
  var markLetter = false;
  for (k=0; k<bullets.length; k++) {
    if (bullets[k] == "[") {
      markLetter = true;
    } else if (bullets[k] == "]") {
      markLetter = false;
      bullets = bullets.replace("[", "<span class='define' onmouseover='define(\"" + word + "\", event)' onmouseout='defineNone()'>");
  bullets = bullets.replace("]", "</span>")
      word = "";
    } else if (markLetter) {
      word += bullets[k];
    }
  }  
  return bullets;
}
 
function define(word, event) {
  // console.log(word);
  // console.log("ID: ")
  // console.log(id)
  // var top = document.getElementById(id).offsetTop;
  // var left = document.getElementById(id).offsetLeft;
  // var top = window.scrollY + document.querySelector(id).getBoundingClientRect().top // Y
  // var left = window.scrollX + document.querySelector(id).getBoundingClientRect().left
  // console.log(top)
  // console.log(left)
  var x = event.clientX;
  var y = event.clientY;
  console.log(x)
  console.log(y)
  document.getElementById("defineDIV").style.top = (y - 150 + window.scrollY) + "px";
  document.getElementById("defineDIV").style.left = (x - 100 + window.scrollX) + "px";
  document.getElementById("defineDIV").style.animation = "defineIn .5s ease 1 forwards";
  // loadJSON("https://1-cardboard.alphacentauri4.repl.co/files/vocabulary.json", fillDefinition, onFail);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log("Success");
        fillDefinition(word, JSON.parse(xhr.responseText));
      }
      else {
        onFail(xhr);
      }
    }
  };
xhr.open('GET', "https://1-cardboard.alphacentauri4.repl.co/files/vocabulary.json", false);
xhr.send();
}

function fillDefinition(word, json) {
  var element = [word.toLowerCase()][0];
  // console.log(json.element)
  // console.log(element)
  // console.log(json)
  document.getElementById("defineWord").innerHTML = word;
  document.getElementById("defineText").innerHTML = json[element];
}

function defineNone() {
  console.log("exit")
    document.getElementById("defineDIV").style.animation = "defineOut .5s 0s ease 1 forwards";
}
  

function filePathBack() {
  prevPaths.pop();
  if (prevPaths.length < 1) {return}
  var tempArray = [];
  tempArray.push(prevPaths[prevPaths.length - 1])
  filePathStart(tempArray, false)
}

function filePathStart(path, record = true) {
  // console.log("Entered")
  // console.log(path)
  var lastLocation = path[0];
  if (record == true) {
  prevPaths.push(lastLocation)}
  // console.log(lastLocation)
  var type = lastLocation[0]
  var prefix = "/";
  var suffix = ".json";
  if (type == "f") {prefix += "folders"}
  else {prefix += "files"}
  var modifiedPath = prefix + "/" + lastLocation.slice(2, lastLocation[lastLocation.length]) + suffix
  // console.log(modifiedPath)
  loadJSON(modifiedPath, onLoad, onFail)
  // console.log("Prevpaths: ")
  // console.log(prevPaths)
  sessionStorage.setItem("pagePath", path)
}

function starManager() {
  
}

modeManager(curMode, 0, false)
// filePathStart(["f/federalist_papers"])
var pagePath = sessionStorage.getItem("pagePath");
if (pagePath != null) {
filePathStart([sessionStorage.getItem("pagePath")])
} else {
  filePathStart(["f/home"])
}
changeNavWidth()
document.title = "View - Cardboard";