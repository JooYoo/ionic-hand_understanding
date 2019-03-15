import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { handTrack } from 'handtrackjs';
var Tab1Page = /** @class */ (function () {
    function Tab1Page() {
        this.imgindex = 1;
        this.isVideo = false;
        this.model = null;
        this.updateNote = 'loading model ..';
        this.context = this.canvas.getContext("2d");
        this.modelParams = {
            flipHorizontal: true,
            maxNumBoxes: 20,
            iouThreshold: 0.5,
            scoreThreshold: 0.6,
        };
    }
    Tab1Page.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Load the model.
        handTrack.load(this.modelParams).then(function (lmodel) {
            // detect objects in the image.
            _this.model = lmodel;
            _this.updateNote = 'Model loaded';
        });
    };
    Tab1Page.prototype.runDetection = function () {
        var _this = this;
        this.model.detect(this.video).then(function (predictions) {
            console.log("Predictions: ", predictions);
            _this.model.renderPredictions(predictions, _this.canvas, _this.context, _this.video);
            if (_this.isVideo) {
                requestAnimationFrame(_this.runDetection);
            }
        });
    };
    Tab1Page.prototype.toggleVideo = function () {
        if (!this.isVideo) {
            this.updateNote = "Starting video";
            this.startVideo();
        }
        else {
            this.updateNote = "Stopping video";
            handTrack.stopVideo(this.video);
            this.isVideo = false;
            this.updateNote = "Video stopped";
        }
    };
    Tab1Page.prototype.startVideo = function () {
        handTrack.startVideo(this.video).then(function (status) {
            console.log("video started", status);
            if (status) {
                this.updateNote = "Video started. Now tracking";
                this.isVideo = true;
                this.runDetection();
            }
            else {
                this.updateNote = "Please enable video";
            }
        });
    };
    tslib_1.__decorate([
        ViewChild('myVideo'),
        tslib_1.__metadata("design:type", Object)
    ], Tab1Page.prototype, "video", void 0);
    tslib_1.__decorate([
        ViewChild('canvas'),
        tslib_1.__metadata("design:type", Object)
    ], Tab1Page.prototype, "canvas", void 0);
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map