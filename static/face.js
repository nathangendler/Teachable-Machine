let faceapi;
let detections= [];

let video;
let canvas;
function setup(){
    canvas = createCanvas(480, 360);
    canvas.id('canvas');

    video = createCapture(VIDEO);
    video.id('video');
    video.size(width, height);

    const faceOptions = {
        withLandmark: true,
        withExpressions: true,
        withDescriptors: true,
        minConfidence: 0.5
    };

    faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady(){
    faceapi.detect(gotFaces);
}

function draw(){

}
function gotFaces(error, result){
    if(error){
        console.log(error);
        return;
    }

    detections = result;
    console.log(detections);

    clear();
    drawBoxes(detections)
    drawLandmarks(detections)
    //drawExpressions(detections, 20, 250, 14)

    faceapi.detect(gotFaces)
}




function drawBoxes(detections){
if(detections.length > 0){
        for(let f=0; f < detections.length; f++){
            let {_x, _y, _width, _height} = detections[0].alignedRect._box;

            stroke(44, 169, 225);
            strokeWeight(5);
            noFill();
            rect(_x, _y, _width, _height);
        }
    }
}

function drawLandmarks(detections){
    if(detections.length > 0){
        for(f = 0; f < detections.length; f++){
            let points = detections[f].landmarks.positions;
            for(let i = 0; i < points.length; i++){
                stroke(44, 169, 225);
                strokeWeight(3);
                point(points[i]._x, points[i]._y);
            }
        }
    }
}

function drawExpressions(detections, x, y, textYSpace){
  if(detections.length > 0){
    let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;
    textFont('Helvetica Neue');
    textSize(14);
    noStroke();
    fill(44, 169, 225);

    text("neutral:       " + nf(neutral*100, 2, 2)+"%", x, y);
    text("happiness: " + nf(happy*100, 2, 2)+"%", x, y+textYSpace);
    text("angry:        " + nf(angry*100, 2, 2)+"%", x, y+textYSpace*2);
    text("sad:            "+ nf(sad*100, 2, 2)+"%", x, y+textYSpace*3);
    text("surprised:  " + nf(surprised*100, 2, 2)+"%", x, y+textYSpace*4);
  } else {
    text("neutral: ", x, y);
    text("happiness: ", x, y + textYSpace);
    text("angry: ", x, y + textYSpace*2);
    text("sad: ", x, y + textYSpace*3);
    text("surprised: ", x, y + textYSpace*4);
  }
}


