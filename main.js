objects = [];
Status = "";

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();

  video=createCapture(VIDEO);
  video.hide();
}
function start(){
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  objectName=document.getElementById("input").value;
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 640, 420);

      if(Status != "")
      {
        r=random(255);
        g=random(255);
        b=random(255);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("NOO").innerHTML="No Of Objects Detected= "+objects.length;
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == object_name) { 
            video.stop(); objectDetector.detect(gotResult); 
            document.getElementById("object_status").innerHTML = object_name + " Found"; synth = window.speechSynthesis; 
            utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
            synth.speak(utterThis); } 
          else {
             document.getElementById("object_status").innerHTML = object_name + " Not Found"; 
            }
        }
      }
}
