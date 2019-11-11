import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { interval } from "rxjs";
import { CommonFunction } from '../../../service'
import * as $ from 'jquery';
declare var jQuery: any;

@Component({
    selector: 'app-lightdimmer',
    templateUrl: './light-dimmer.component.html',
    styleUrls: ['./light-dimmer.component.css']
})
export class LightdimmerComponent {
    dragItem: any;
    container: any;
    active: boolean = false;
    currentY: number = 0;
    initialY: any;
    yOffset: number = 0;

    dragSwitch: any;
    dragSwitchContainer: any;
    currentX: number = 0;
    initialX: number = 0;
    xOffset: number = 0;

    constructor(private commonFunction: CommonFunction, private elementRef: ElementRef) { }

    ngOnInit() {
        this.commonFunction.resetToMainForm(true);
    }

    ngAfterViewInit() {
        this.dragItem = document.querySelector("#item");
        this.container = document.querySelector("#container");


        this.elementRef.nativeElement.querySelector('#container')
            .addEventListener('touchstart', this.dragStart.bind(this));
        this.elementRef.nativeElement.querySelector('#container')
            .addEventListener('touchmove', this.dragEvent.bind(this));


        var demo = document.getElementById("container")

        // this.elementRef.nativeElement.querySelector('#container')
        //     .addEventListener('touchend', this.dragEnd.bind(this));

        // this.container.addEventListener("touchstart", this.dragStart, false);
        // this.container.addEventListener("touchend", this.dragEnd, false);
        // this.container.addEventListener("touchmove", this.drag, false);

        // this.container.addEventListener("mousedown", this.dragStart, false);
        // this.container.addEventListener("mouseup", this.dragEnd, false);
        // this.container.addEventListener("mousemove", this.drag, false);
    }


    dragStart(e: any) {

        if (e.type === "touchstart") {
            //this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;

        } else {
            //this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;

        }

        if (e.target === this.dragItem) {
            this.active = true;
        }
    }

    dragEnd(e: any) {

        this.initialY = this.currentY;
        this.active = false;
    }

    dragEvent(e: any) {
        if (this.active) {

            e.preventDefault();
            var item = document.getElementById("item");

            if (e.type === "touchmove") {
                this.currentY = e.touches[0].clientY - this.initialY;
                console.log(`dragEvent if currentY = ${this.currentY} clientY = ${e.touches[0].clientY} initialY = ${this.initialY} `);
            } else {
                this.currentY = e.clientY - this.initialY;
                console.log('dragEvent else ' + this.currentY);
            }
            this.yOffset = this.currentY;

            // if (this.currentY < -item.offsetTop) {
            //     this.currentY = -item.offsetTop;
            // }

            // if (this.currentY > item.offsetTop) {
            //     this.currentY = item.offsetTop;
            // }
            var demo = document.getElementById("container")

            //if (this.currentY > -item.offsetTop && this.currentY < item.offsetTop) {

            this.setTranslate(0, this.currentY, this.dragItem);
            //}
        }
    }

    setTranslate(xPos: any, yPos: any, el: any) {
        //xPos = 0;
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }



    ocillateSwitch(turnOn: boolean) {
        var item = document.getElementById("item");

        var controllerPosition = turnOn ? item.offsetTop : -item.offsetTop;
        this.currentY = controllerPosition > 0 ? controllerPosition - 1 : controllerPosition + 1;
        //this.yOffset = this.currentY;
        console.log('Calling ocillateSwitch' + item.offsetTop);
        $('#item').stop().animate({
            top: "+=" + 120 + "px"
        }, 2000);


    }
}