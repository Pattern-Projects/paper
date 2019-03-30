var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
context.textStyle = "black";
canvas.width = 600;
canvas.height = 400;

// Debug Feature
var shownames = true;

var scenes = [];
var scene = {};
var sceneNum = 0;

function load() {
    // Collect all info from HTML
    var HTMLscenes = document.getElementsByTagName("scene");
    for (var i = 0; i < HTMLscenes.length; i++) {
        var scene = {};
        var beatsArray = [];
        scene.type = HTMLscenes[i].getAttribute("type");
        var beats = HTMLscenes[i].getElementsByTagName("beat");
        for (var i = 0; i < beats.length; i++) {
            var beat = {};
            var objectsArray = [];
            beat.spriteLength = beats[i].getAttribute("spriteLength");
            var objects = beats[i].getElementsByTagName("object");
            for (var i = 0; i < objects.length; i++) {
                var object = {};
                object.x = parseInt(objects[i].getAttribute("x"), 16);
                object.y = parseInt(objects[i].getAttribute("y"), 16);
                object.name = objects[i].getAttribute("name");
                
                var sprites = objects[i].getElementsByTagName("sprite");
                object.sprites = sprites;
                objectsArray.push(object);
            }
            beat.objects = objectsArray;
            beatsArray.push(beat);
        }
        scene.beats = beatsArray;
        scenes.push(scene);
    }
    nextScene();
}

function nextScene() {
    // Initiate Scene
    scene = scenes[sceneNum];
    sceneNum++;
    action();   // Run Scene
}

var beat = 0;  //Here for now
var sprite = 0;

function action() {
    var renders = [];
    var beats = scene.beats;
    var thisBeat = beats[beat];
    

    // When Button pressed
    // beat++;
    
    sprite++;
    if (sprite > thisBeat.spriteLength)
    {
        sprite = 0;
    }
    
    renders = [""+sprite, 100, 100];
    render(renders)

    
    // Stays on clip until a change happens
    if (true) { action }
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
            console.log(item)   //Render not showing up
        }
    });
}
window.onload = function () {load()};


