/*
* ***GENERIC STUFF.***
*/

var text = 0;
var zDown = 0;
var xDown = 0;
var frame = 0;
var introSong = new sound("/keiths-site/image_dir/conflictedPremisesRecognition.mp3");

function component(width, height, color, x, y, type, frame) {
    //Used to create new components
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    } else if (type == "shape"){
        //nothing special
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    //Enables components to change images / colors
    this.update = function() {
        ctx = frame.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else if (type == "shape") {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else if (type == "outline") {
            ctx.strokeStyle = color;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

function sound(src) {
    //Constructor for sound
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

window.addEventListener("keydown", continueDialogue, false);

function continueDialogue(e) {
    switch (e.keyCode) {
        //"Enter" key continues dialogue.
        case 13:
            text += 1;
            break;
        //"X" key
        case 88:
            xDown = 1;
            break;
        //"Z" key
        case 90:
            zDown = 1;
            break;
    }
}

/*
* ***BEACH STUFF.***
*/

function startBeachFrame() {
    if (frame == 2) {
        stopPremisesFrame();
    } else if (frame == 1) {
        stopTrainFrame();
    }
    //Creating shapes and image components

    beach = new component(512, 256, "/keiths-site/image_dir/IGBeach.png", 0, 0, "image", beachFrame);

    if (frame != 3) {
        beachFrame.start();
        frame = 3;
    } else {
        stopBeachFrame();
    }
}

function stopBeachFrame() {
    beachFrame.stop();
    beachFrame.clear();
}

var beachFrame = {
    //Creating canvas
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 512;
        this.canvas.height = 256;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateBeachFrame, 20);
        text = 0;
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        this.canvas.width = 0;
        this.canvas.height = 0;
    }
}

function updateBeachFrame() {
    beachFrame.clear();
    beach.update();
}


/*
* ***TRAIN STUFF.***
*/

function startTrainFrame() {
    if (frame == 2) {
        stopPremisesFrame();
    } else if (frame == 3) {
        stopBeachFrame();
    }
    //Creating shapes and image components

    train = new component(300, 300, "/keiths-site/image_dir/train2.gif", 0, 0, "image", trainFrame);
    trash = new component(80, 80, "/keiths-site/image_dir/trash.gif", 20, 220, "image", trainFrame);
    buildingback1 = new component(100, 200, "#4f519a", 120, 60, "shape", trainFrame);
    buildingback2 = new component(30, 80, "#4f519a", 100, 20, "shape", trainFrame);
    buildingback3 = new component(60, 100, "#4f519a", 200, 30, "shape", trainFrame);
    buildingback4 = new component(50, 80, "#4f519a", 270, 40, "shape", trainFrame);
    buildingback5 = new component(40, 90, "#4f519a", 370, 10, "shape", trainFrame);
    building1 = new component(100, 100, "#45545a", 0, 0, "shape", trainFrame);
    building1side = new component(20, 100, "#2c363a", 100, 0, "shape", trainFrame);
    building2 = new component(100, 150, "#45545a", 150, 50, "shape", trainFrame);
    building2side = new component(20, 150, "#2c363a", 250, 50, "shape", trainFrame);
    building3 = new component(80, 200, "#45545a", 315, 0, "shape", trainFrame);
    building3side = new component(20, 200, "#2c363a", 375, 0, "shape", trainFrame);

    if (frame != 1) {
        trainFrame.start();
        frame = 1;
    } else {
        stopTrainFrame();
    }
}

function stopTrainFrame() {
    trainFrame.stop();
    trainFrame.clear();
}

var trainFrame = {
    //Creating canvas
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateTrainFrame, 20);
        text = 0;
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        this.canvas.width = 0;
        this.canvas.height = 0;
    }
}

function updateTrainFrame() {

    trainFrame.clear();
    //Resetting building positions
    if (buildingback1.x < -100) {
        buildingback1.x = 350;
    }
    if (buildingback2.x < -100) {
        buildingback2.x = 350;
    }
    if (buildingback3.x < -100) {
        buildingback3.x = 350;
    }
    if (buildingback4.x < -100) {
        buildingback4.x = 350;
    }
    if (buildingback5.x < -100) {
        buildingback5.x = 350;
    }

    //Resetting more building positions
    if (building1.x < -100) {
        building1.x = 350;
    }
    if (building2.x < -100) {
        building2.x = 350;
    }
    if (building3.x < -100) {
        building3.x = 350;
    }
    if (building1side.x < -100) {
        building1side.x = 350;
    }
    if (building2side.x < -100) {
        building2side.x = 350;
    }
    if (building3side.x < -100) {
        building3side.x = 350;
    }

    //Moving buildings
    buildingback1.x -= 2;
    buildingback2.x -= 2;
    buildingback3.x -= 2;
    buildingback4.x -= 2;
    buildingback5.x -= 2;
    buildingback1.update();
    buildingback2.update();
    buildingback3.update();
    buildingback4.update();
    buildingback5.update();
    building1.x -= 3;
    building1.update();
    building2.x -= 3;
    building2.update();
    building3.x -= 3;
    building3.update();
    building1side.x -= 3;
    building1side.update();
    building2side.x -= 3;
    building2side.update();
    building3side.x -= 3;
    building3side.update();
    train.update();
    trash.update();

    //Creating text.
    trainFrame.context.textAlign = "center"
    trainFrame.context.font = "16px Arial";
    trainFrame.context.strokeStyle="aqua";

    if (text == 0) {
        trainFrame.context.strokeText("(Click on Frame and press Enter to begin.)",150,20);
    } else if (text == 1) {
        trainFrame.context.strokeText("*Bzzt*",150,20);
    } else if (text == 2) {
        trainFrame.context.strokeText("Next stop... Data-Strato-Theater.",150,20);
    } else if (text == 3) {
        trainFrame.context.strokeText("Doors will open on both sides.",150,20);
    } else if (text == 4) {
        trainFrame.context.strokeText("Thank you for riding the T.",150,20);
    } else {
        text = 1;
    }
}



/*
* ***PREMISES STUFF.***
*/

function startPremisesFrame() {
    if (frame == 1) {
        stopTrainFrame();
    } else if (frame == 3) {
        stopBeachFrame();
    }
    //Creating shapes and image components

    charAmelia = new component(80, 80, "/keiths-site/image_dir/ameliaPortrait.png", 0, 0, "image", premisesFrame);
    charHermes = new component(80, 80, "/keiths-site/image_dir/hermesPortrait.png", 80, 0, "image", premisesFrame);
    charArnold = new component(80, 80, "/keiths-site/image_dir/arnoldPortrait.png", 160, 0, "image", premisesFrame);
    charLeon = new component(80, 80, "/keiths-site/image_dir/leonPortrait.gif", 240, 0, "image", premisesFrame);
    charJim = new component(80, 80, "/keiths-site/image_dir/jimPortrait.png", 320, 0, "image", premisesFrame);
    charSylvie = new component(80, 80, "/keiths-site/image_dir/sylviePortrait.png", 0, 80, "image", premisesFrame);
    envWindow = new component(80, 80, "/keiths-site/image_dir/windowView.png", 80, 80, "image", premisesFrame);
    envBoat = new component(80, 80, "/keiths-site/image_dir/boat.png", 160, 80, "image", premisesFrame);
    envDocks = new component(80, 80, "/keiths-site/image_dir/dock.png", 240, 80, "image", premisesFrame);
    envWheel = new component(80, 80, "/keiths-site/image_dir/carParked.png", 320, 80, "image", premisesFrame);
    envGlass = new component(80, 80, "/keiths-site/image_dir/restaurant.png", 0, 160, "image", premisesFrame);
    envDinner = new component(80, 80, "/keiths-site/image_dir/dinner.png", 80, 160, "image", premisesFrame);
    envExt = new component(80, 80, "/keiths-site/image_dir/restaurantExt.png", 160, 160, "image", premisesFrame);
    envData = new component(80, 80, "/keiths-site/image_dir/data.png", 240, 160, "image", premisesFrame);
    envDash = new component(80, 80, "/keiths-site/image_dir/copCar.png", 320, 160, "image", premisesFrame);
    envSign = new component(80, 80, "/keiths-site/image_dir/crossWalkStop.png", 0, 240, "image", premisesFrame);
    envHull = new component(80, 80, "/keiths-site/image_dir/inHull.png", 80, 240, "image", premisesFrame);
    darkness = new component(800, 400, "#000000", 0, 0, "shape", premisesFrame);
    selector = new component(80, 80, "aqua", 0, 0, "outline", premisesFrame);

    if (frame != 2) {
        premisesFrame.start();
        text = -10;
        introSong.play();
        frame = 2;
    } else {
        stopPremisesFrame();
    }
}

function stopPremisesFrame() {
    introSong.stop();
    premisesFrame.stop();
    premisesFrame.clear();
}

var premisesFrame = {
    //Creating canvas
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updatePremisesFrame, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        this.canvas.width = 0;
        this.canvas.height = 0;
    }
}

function updatePremisesFrame() {

    //Creating text.
    premisesFrame.context.textAlign = "center"
    premisesFrame.context.font = "16px Arial";
    premisesFrame.context.strokeStyle="aqua";

    premisesFrame.clear();

    darkness.update()
    charAmelia.update()
    charHermes.update()
    charArnold.update()
    charLeon.update()
    charJim.update()
    charSylvie.update()
    envWindow.update()
    envHull.update()
    envSign.update()
    envDash.update()
    envData.update()
    envExt.update()
    envDinner.update()
    envGlass.update()
    envBoat.update()
    envDocks.update()
    envWheel.update()

    if (zDown == 1 && xDown != 1) {
        if (selector.x > 0) {
            selector.x -= 80;
        } else {
            selector.x = 320;
            selector.y -= 80;
        }
        if (selector.y < 0) {
            selector.x = 80;
            selector.y = 240;
        }
        zDown = 0;
    }
    if (xDown == 1 && zDown != 1) {
        if (selector.x < 320) {
            selector.x += 80;
        } else {
            selector.x = 0;
            selector.y += 80;
        }
        if (selector.x == 160 && selector.y == 240) {
            selector.x = 0;
            selector.y = 0;
        }
        xDown = 0;
    }

    /*
    if (selector.x == 0 && selector.y == 0) {

    } else if (selector.x == 80 && selector.y == 0) {

    } else if (selector.x == 160 && selector.y == 0) {
        
    } else if (selector.x == 240 && selector.y == 0) {
        
    } else if (selector.x == 320 && selector.y == 0) {
        
    } else if (selector.x == 0 && selector.y == 80) {
        
    } else if (selector.x == 80 && selector.y == 80) {
        
    } else if (selector.x == 160 && selector.y == 80) {
        
    } else if (selector.x == 240 && selector.y == 80) {
        
    } else if (selector.x == 320 && selector.y == 80) {
        
    } else if (selector.x == 0 && selector.y == 160) {
        
    } else if (selector.x == 80 && selector.y == 160) {
        
    } else if (selector.x == 160 && selector.y == 160) {
        
    } else if (selector.x == 240 && selector.y == 160) {
        
    } else if (selector.x == 320 && selector.y == 160) {
        
    } else if (selector.x == 0 && selector.y == 240) {
        
    } else if (selector.x == 80 && selector.y == 240) {
        
    }*/

    selector.update()
}