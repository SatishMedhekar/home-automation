import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { CommonFunction } from '../../../service'
import * as $ from 'jquery';
import { DimmerService } from "../../navigation/service/dimmer.service";
import { SwitchAction } from "src/app/interfaces/enum";
import { ThrowStmt } from "@angular/compiler";
declare var jQuery: any;

@Component({
    selector: 'app-lightdimmer',
    templateUrl: './light-dimmer.component.html',
    styleUrls: ['./light-dimmer.component.css']
})
export class LightdimmerComponent {
    @ViewChild('container', {static: false}) container: ElementRef;
    @ViewChild('item', {static: false}) item: ElementRef;
    @Input() dimmerControllerFromSwitch:SwitchAction
    @Output() dimmerDrag: EventEmitter<SwitchAction> = new EventEmitter();
    dimmerShift=0;
    timeLeft: number = 60;
    interval;
    dragPosition = {x: 0, y: 0};
    clickEventsubscription:Subscription

    constructor(
        private commonFunction: CommonFunction, 
        private elementRef: ElementRef,
        private dimmerService:DimmerService) {
            this.clickEventsubscription= this.dimmerService.getSwitchClickEvent().subscribe(result=>{
                this.dimmerControlFromMainSwitch(result);
            })
         }

    dimmerControlFromMainSwitch(switchAction:SwitchAction){
        console.log(`The value is click  ${SwitchAction[SwitchAction.ON]}`);
        if(SwitchAction[switchAction] === SwitchAction[SwitchAction.ON]){
            this.setDimmerOff()
        } else {
            this.setDimmerOn()
        }
    }

    ngOnInit() {
        this.commonFunction.resetToMainForm(true);
    }

    ngOnChanges():void{
        if(SwitchAction[this.dimmerControllerFromSwitch] ==  SwitchAction[SwitchAction.ON]){
            this.setDimmerOn()
        } else {
            this.setDimmerOff()
        }
    }

    onDragEnded(event){
        let element = event.source.getRootElement();
        let boundingClientRect = element.getBoundingClientRect();
        let parentPosition = this.getPosition(element);
        let valueDifference = Math.floor(boundingClientRect.bottom) - Math.floor(parentPosition.top) 
        this.dimmerShift =  valueDifference 
        let xpos = Math.floor(boundingClientRect.x - parentPosition.left)
        let ypos = Math.floor(boundingClientRect.y - parentPosition.top)        
        console.log(`xpos ${xpos}  ypos ${boundingClientRect.y - parentPosition.top} 
                     dimmerShift ${this.dimmerShift}
                     ParentTopPosition ${parentPosition.top}  
                     boundingClientRect.top ${boundingClientRect.y} 
                     bottom ${boundingClientRect.bottom}`)
                     
                     if(ypos > 0){
                       console.log('Dimmer Calling Switch On')
                        this.dimmerDrag.emit(SwitchAction.ON)
                    }else{
                        //this.dimmerService.sendSwitchClickEvent(SwitchAction.OFF);
                        console.log('Dimmer Calling Switch Off')
                        this.dimmerDrag.emit(SwitchAction.OFF)
                    }
    }

    getPosition(el) {
        let x = 0;
        let y = 0;
        while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
          x += el.offsetLeft - el.scrollLeft;
          y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
                  }
                         return { top: y, left: x };
      }

      setDimmerOff(){
          console.log('Setting DimmerOff')
        this.dragPosition = {x: this.dragPosition.x + 0, y:  .01};
      }
      
      setDimmerOn(){
          console.log('Setting DimmerOn')
        if(this.item != undefined && this.container != undefined){
         let switchHeight = Math.abs(this.item.nativeElement.scrollHeight)
         let containerHeight = Math.abs(this.container.nativeElement.scrollHeight)
         let displaceDimmerSwitchPosition = containerHeight - switchHeight;
         this.dragPosition = {x: this.dragPosition.x + 0, y:  displaceDimmerSwitchPosition};
        }
      }

      startTimer() {
        // this.interval = setInterval(() => {
        //   if(this.timeLeft > 0) {
        //     this.timeLeft--;
        //   } else {
        //     this.timeLeft = 60;
        //   }
        // },1000)
 
      }

}