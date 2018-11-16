function parse_ghx(){
  let loaded_ghx;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'assets/scripts/Spheres.ghx', true);

  console.log("get sent")
  //xhr.timeout = 2000; // time in milliseconds

  xhr.onload = function () {
    // Request finished. Do processing here.
    var xmlDoc = this.responseXML; // <- Here's your XML file
    console.log(btoa(XMLToString(xmlDoc)).length);
    //console.log(XMLToString(xmlDoc));
    console.log(xmlDoc);
    loaded_ghx = btoa(XMLToString(xmlDoc));
    loaded_ghx_master = loaded_ghx;
    console.log("loaded_ghx is loaded");
  };

  xhr.ontimeout = function (e) {
    // XMLHttpRequest timed out. Do something here.
  };

  xhr.send(null);
}

function XMLToString(oXML){
 //code for IE
 if (window.ActiveXObject) {
 var oString = oXML.xml; return oString;
 }
 // code for Chrome, Safari, Firefox, Opera, etc.
 else {
 return (new XMLSerializer()).serializeToString(oXML);
 }
};

/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'file.xml', true);

xhr.timeout = 2000; // time in milliseconds

xhr.onload = function () {
  // Request finished. Do processing here.
  var xmlDoc = this.responseXML; // <- Here's your XML file
};

xhr.ontimeout = function (e) {
  // XMLHttpRequest timed out. Do something here.
};

xhr.send(null);
*/
/*
var parser = new DOMParser();
//var filepath = document.getElementById("upload_files").value;
let filepath = "../../scripts/Division.ghx"
console.log(filepath);
var xmlDoc = parser.parseFromString(filepath,"application/xml");

console.log(xmlDoc);
*/
