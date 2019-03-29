var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// To test render() create objects[] array and pass to render()



function render(objects){
    objects.forEach(function(object){
        if (object[3] == true)
        {
            context.drawImage(object[2], object[0], object[1]);
            console.log("image");
        }
        else if (object[3] == false){
            context.fillText(object[2], object[0], object[1]);
            console.log("text");
        }
    })
}