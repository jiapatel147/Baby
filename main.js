song="";
objects=[];
status = "" ;

function preload() {
    song=loadSound("my_best_friend.mp3");
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);

    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status= detecting objects";
    }

    function modelLoaded() {
        console.log("Modal Loaded!")
        status = true;
    }

    function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video,0,0,380,380);
    if (status != "")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        
        objectDetector.detect(video, gotResults);
        for ( i= 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are"+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ""+ percent +"%",objects[i].x + 15, objects[i].y +15);
            nofill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found"
                console.log("play");
                song.play();
            }
        }
        if(objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
        }
    }
}