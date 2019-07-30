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
        this.dragSwitch = document.querySelector("#switch");
        this.dragSwitchContainer = document.querySelector("#switchcase")

        this.elementRef.nativeElement.querySelector('#container')
            .addEventListener('touchstart', this.dragStart.bind(this));
        this.elementRef.nativeElement.querySelector('#container')
            .addEventListener('touchmove', this.dragEvent.bind(this));

        this.elementRef.nativeElement.querySelector('#switchcase')
            .addEventListener('touchstart', this.dragStartSwitch.bind(this));
        this.elementRef.nativeElement.querySelector('#switchcase')
            .addEventListener('touchmove', this.dragSwitchEvent.bind(this));
        var demo = document.getElementById("container")
        console.log('The top value is ' + demo.offsetTop + ' ' + demo.scrollTop);
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
            console.log('dragstart if initialY ' + this.initialY)
        } else {
            //this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
            console.log('dragstart else initialY ' + this.initialY)
        }

        if (e.target === this.dragItem) {
            this.active = true;
        }
    }

    dragEnd(e: any) {
        console.log('dragend if initialY ' + this.initialY)
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
            console.log('The top value is ' + demo.offsetTop);
            //if (this.currentY > -item.offsetTop && this.currentY < item.offsetTop) {
            console.log('On roll currentY ' + this.currentY);
            this.setTranslate(0, this.currentY, this.dragItem);
            //}
        }
    }

    setTranslate(xPos: any, yPos: any, el: any) {
        //xPos = 0;
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    dragStartSwitch(e: any) {

        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
        }

        if (e.target === this.dragSwitch) {
            console.log('target');
            this.active = true;
        }
    }

    dragEndSwitch(e: any) {
        this.initialY = this.currentY;
        this.active = false;
    }

    dragSwitchEvent(e: any) {

        if (this.active) {

            e.preventDefault();
            var item = document.getElementById("switch");
            console.log(`active-> ${this.currentX}, ${item.offsetLeft}, ${this.initialX}, ${e.touches[0].clientX}`);

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
            } else {
                this.currentX = e.clientX - this.initialX;
            }
            this.xOffset = this.currentX;

            if (this.currentX < -item.offsetLeft) {
                this.currentX = -item.offsetLeft;
            }

            if (this.currentX > item.offsetLeft) {
                this.currentX = item.offsetLeft;
            }

            //The left and right value is -/+ and a number.  This variable will convert -ve to +ve number then to check the range.
            var positiveValueOfCurrentX = this.currentX < 0 ? -(this.currentX) : this.currentX;

            // if (positiveValueOfCurrentX <= item.offsetLeft) {
            //set left or right endpoint for the switch
            this.currentX = this.currentX > 0 ? item.offsetLeft : -item.offsetLeft;
            this.setTranslate(this.currentX, 0, this.dragSwitch);
            this.ocillateSwitch(true);
            //}
        }
    }

    setTranslateSwitch(xPos: any, yPos: any, el: any) {
        yPos = 0;
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