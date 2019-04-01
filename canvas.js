var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
context.textStyle = "black";
canvas.width = 600;
canvas.height = 400;
window.addEventListener('keydown', this.keyDown, false);




// Debug Features
var shownames = true;
var fps = 30;

var scenes = [];
var input = {};
var scene = {};
var sceneNum = 0;
var fire = false;
var player = { x: 0, y: 0 };

function load() { //Loads in items from HTML
    // Collect all info from HTML
    var HTMLscenes = document.getElementsByTagName("scene");
    for (var i = 0; i < HTMLscenes.length; i++) { //Every scene in document
        var scene = {};
        var beatsArray = [];
        scene.type = HTMLscenes[i].getAttribute("type");
        var beats = HTMLscenes[i].getElementsByTagName("beat");
        for (var j = 0; j < beats.length; j++) { //Every beat in scene
            var beat = {};
            var objectsArray = [];
            beat.spriteLength = beats[j].getAttribute("spriteLength");
            var objects = beats[j].getElementsByTagName("object");
            for (var k = 0; k < objects.length; k++) { //Every object in beat
                var object = {};
                object.x = parseInt(objects[k].getAttribute("x"), 16);
                object.y = parseInt(objects[k].getAttribute("y"), 16);
                object.name = objects[k].getAttribute("name");
                if (object.name == "player") {
                    player.x = object.x;
                    player.y = object.y;
                }

                var sprites = objects[k].getElementsByTagName("img"); //Every sprite in object
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

var restrained = { 39: true };
var loop; //here for now
function nextScene() { // Initiate Scene
    clearTimeout(loop);

    scene = scenes[sceneNum];
    sceneNum++;
    if (sceneNum >= scenes.length) {
        sceneNum = 0;
    }

    if(scene.type == "clip")
    {
        restrained = { 39: true };
    }
    if(scene.type == "level")
    {
        restrained = {};
    }

    action(); // Run Scene
}

var beat = 0; //Here for now
var sprite = 0;
var command = {};


async function action() { //Runs the scene
    var renders = [];
    var beats = scene.beats;
    var thisBeat = beats[beat];
    var objects = thisBeat.objects;

    //Commands
    if (command[39]) {
        if (scene.type == "clip") {
            nextBeat();
        }
        if (scene.type == "level") {
            player.x += 5;
        }
    }
    if (command[37]) {
        player.x -= 5;
    }
    if (command[40]) {
        player.y += 5;
    }
    if (command[38]) {
        player.y -= 5;
    }
    command = {};


    //Iterate sprites, loop when too high
    sprite++;
    if (sprite >= thisBeat.spriteLength) {
        sprite = 0;
    }

    //Send objects to renderer
    //If sprite src is empty move to next beat
    objects.forEach(function(object) {
        var spriteIndex = parseInt(sprite / (thisBeat.spriteLength / object.sprites.length), 16);
        if (object.sprites[spriteIndex].src != "") {
            var item = [];
            item.push(object.sprites[spriteIndex]);
            if (object.name == "player") {
                item.push(player.x);
                item.push(player.y);
            }
            else {
                item.push(object.x);
                item.push(object.y);
            }
            item.push(object.name);
            renders.push(item);
        }
        else {
            nextBeat();
        }
    });
    render(renders);

    function nextBeat() {
        beat++;
        sprite = 0;
    }


    //Loop beats when too high    
    if (beat >= beats.length) {
        beat = 0;
        sprite = 0;
        nextScene();
    }

    // Stays on clip until a change happens
    if (true) { loop = setTimeout(function() { action() }, 1000 / fps) }
}

function render(renders) { //Renderer
    context.clearRect(0, 0, canvas.width, canvas.height); //Clear Screen
    renders.forEach(function(item) { //For each item in renders array
        if (typeof item[0] == "object") { //If object, render image
            context.drawImage(item[0], item[1], item[2]);
            if (shownames) { //If shownames setting true show object names
                context.fillText(item[3], item[1], item[2]);
            }
        }
        else if (typeof item[0] == "string") { //If string, render string
            context.fillText(item[0], item[1], item[2]);
        }
    });
}

var fired = {};

async function keyDown(e) { //Log key presses
    var code = e.keyCode;
    //If checked check

    document.onkeydown = function() {
        //If this key is restrained it only fires once per press
        if (restrained[code]) {
            //If it is not fired, fire now
            if (fired[code] != true) {
                fired[code] = true;
                command[code] = e.type == 'keydown';
            }
        }
        else{
            command[code] = e.type == 'keydown';
        }
    }
    document.onkeyup = function() {
        delete fired[code];
    }
}

window.onload = function() { load() }; //Run program after page loads
