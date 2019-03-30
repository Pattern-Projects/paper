var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

var objects = [];
var scenesArray = [];

function load() {
    // Collect all info from HTML
    var scenes = document.getElementsByTagName("scene");
    for (var i = 0; i < scenes.length; i++) {
        var scene = {};
        var beatsArray = [];
        scene.type = scenes[i].getAttribute("type")
        var beats = scenes[i].getElementsByTagName("beat");
        for (var i = 0; i < beats.length; i++) {
            var beat = {};
            var objectsArray = [];
            beat.frameLength = beats[i].getAttribute("frameLength");
            var objects = beats[i].getElementsByTagName("object");
            for (var i = 0; i < objects.length; i++) {
                var object = {};
                object.x = objects[i].getAttribute("x");
                object.y = objects[i].getAttribute("y");
                var sprites = objects[i].getElementsByTagName("sprite")
                object.sprites = sprites;
                objectsArray.push(object)
            }
            beat.objects = objectsArray;
            beatsArray.push(beat)
        }
        scene.beats = beatsArray;
        scenesArray.push(scene)
    }
    console.log(scenesArray)
}

function nextScene() {
    // Initiate Scene

    // Run Scene
    if (true) { clip() }
    if (false) { level() }
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


function render(objects) {
    objects.forEach(function(object) {
        if (typeof object[2] == "object") {
            context.drawImage(object[2], object[0], object[1]);
        }
        else if (typeof object[2] == "string") {
            context.fillText(object[2], object[0], object[1]);
        }
    })
}

nextScene();
load()
