var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// Debug Feature
var shownames = true;

var renders = [];
var scenes = [];
var scene = {};
var sceneNum = 0;

function load() {
    // Collect all info from HTML
    var HTMLscenes = document.getElementsByTagName("scene");
    for (var i = 0; i < HTMLscenes.length; i++) {
        var scene = {};
        var beatsArray = [];
        scene.type = HTMLscenes[i].getAttribute("type")
        var beats = HTMLscenes[i].getElementsByTagName("beat");
        for (var i = 0; i < beats.length; i++) {
            var beat = {};
            var objectsArray = [];
            beat.frameLength = beats[i].getAttribute("frameLength");
            var objects = beats[i].getElementsByTagName("object");
            for (var i = 0; i < objects.length; i++) {
                var object = {};
                object.x = parseInt(objects[i].getAttribute("x"));
                object.y = parseInt(objects[i].getAttribute("y"));
                object.name = objects[i].getAttribute("name");
                
                var sprites = objects[i].getElementsByTagName("sprite")
                object.sprites = sprites;
                objectsArray.push(object)
            }
            beat.objects = objectsArray;
            beatsArray.push(beat)
        }
        scene.beats = beatsArray;
        scenes.push(scene)
    }
    console.log(scenes)
    nextScene()
}

function nextScene() {
    // Initiate Scene
    scene = scenes[sceneNum];

    // Run Scene
    if (true) { clip() }
    if (false) { level() }
    
    // Maybe Better
    // scene()
    
    sceneNum++;
}

function clip() {
    // Stays on clip until a change happens
    if (true) { clip }
    else { nextScene }
}

function level() {
    // Stays on level until a change happens
    if (true) { level }
    else { nextScene }
}


function render(renders) {
    renders.forEach(function(item) {
        if (typeof item[0] == "object") {
            context.drawImage(item[0], item[1], item[2]);
            if (shownames){
                context.fillText(item[3], item[1], item[2]);
            }
        }
        else if (typeof item[0] == "string") {
            context.fillText(item[0], item[1], item[2]);
        }
    })
}
window.onload = function () {load()}


