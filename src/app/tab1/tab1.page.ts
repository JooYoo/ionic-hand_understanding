import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController} from "@ionic/angular";
import { handTrack } from 'handtrackjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('myVideo') video;
  @ViewChild('canvas')canvasEl: ElementRef;

  _CANVAS: any
  _CONTEXT: any

  
  imgindex = 1
  isVideo = false;
  model = null;
  modelParams;

  updateNote='loading model ..'


  constructor() {
    

    this.modelParams = {
      flipHorizontal: true,   // flip e.g for video  
      maxNumBoxes: 20,        // maximum number of boxes to detect
      iouThreshold: 0.5,      // ioU threshold for non-max suppression
      scoreThreshold: 0.6,    // confidence threshold for predictions.
    }
  }

  ionViewDidLoad() {

    this._CANVAS = this.canvasEl.nativeElement
    this._CANVAS.width = 500
    this._CANVAS.height = 500
    this.initialiseCanvas()

    // Load the model.
    handTrack.load(this.modelParams).then(lmodel => {
      // detect objects in the image.
      this.model = lmodel
      this.updateNote=  'Model loaded'
    });

  }

  initialiseCanvas(){
    if(this._CANVAS.getContext){
      this._CONTEXT = this._CANVAS.getContext('2d')
    }
  }

   runDetection() {
    this.model.detect(this.video).then(predictions => {
      console.log("Predictions: ", predictions);
      this.model.renderPredictions(predictions, this._CANVAS, this._CONTEXT, this.video);
      if (this.isVideo) {
        requestAnimationFrame(this.runDetection);
      }
    });
  }



  toggleVideo() {
    if (!this.isVideo) {
      this.updateNote = "Starting video"
      this.startVideo();
    } else {
      this.updateNote = "Stopping video"
      handTrack.stopVideo(this.video)
      this.isVideo = false;
      this.updateNote = "Video stopped"
    }
  }

  startVideo() {
    handTrack.startVideo(this.video).then(function (status) {
      console.log("video started", status);
      if (status) {
        this.updateNote = "Video started. Now tracking"
        this.isVideo = true
        this.runDetection()
      } else {
        this.updateNote = "Please enable video"
      }
    });
  }

}
