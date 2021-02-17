import { Component, Output, ViewChild, EventEmitter, Input } from "@angular/core";
import { ElementRef } from "@angular/core";
import { interval } from "rxjs";
import { SwitchAction } from "src/app/interfaces/enum";
import { DimmerService } from "../../navigation/service/dimmer.service";

@Component({
    selector: 'app-lightswitch',
    templateUrl: './light-switch.component.html',
    styleUrls: ['./light-switch.component.css']
})
export class LightswitchComponent {
    @ViewChild('container', {static: false}) container: ElementRef;
    @ViewChild('item', {static: false}) item: ElementRef;
    @Output() switchClicked: EventEmitter<SwitchAction> = new EventEmitter();
    @Input() switchControllerFromDimmer:SwitchAction
    switchDifference = 0;
    dragPosition = {x: 0, y: 0};

    constructor(private dimmerService:DimmerService){}

    ngOnInit(){
        this.dragPosition = {x: -10, y: 0};
    }

    ngOnChanges():void{
        console.log(`onChange called ${SwitchAction[this.switchControllerFromDimmer]}`)
        if(SwitchAction[this.switchControllerFromDimmer] ==  SwitchAction[SwitchAction.ON]){
            //console.log('Dimmer set switch on')
            this.setSwitchOn()
        } else {
            this.setSwitchOff()
        }
    }

    setSwitchOff(){
        console.log('Setting Switch Off')
        this.dragPosition = {x: -10, y: 0};
      }

    setSwitchOn(){
        console.log('Setting Switch On')
        let switchHeight = Math.abs(this.item.nativeElement.scrollHeight)
        let containerHeight = Math.abs(this.container.nativeElement.scrollHeight)
        let displaceSwitchPosition = Math.abs(containerHeight - switchHeight/2);
        //console.log(`switchHeight ${switchHeight} containerHeight ${containerHeight} displaceSwitchPosition ${displaceSwitchPosition}`)
        this.dragPosition = {x: displaceSwitchPosition, y: 0};
        
    }

    onDragEnded(event){
        let a = this.container.nativeElement;
        let b = this.item.nativeElement;
        let element = event.source.getRootElement();
        let boundingClientRect = element.getBoundingClientRect();
        let parentPosition = this.getPosition(element);
        let xpos = Math.floor(boundingClientRect.x - parentPosition.left)
        let ypos = Math.floor(boundingClientRect.y - parentPosition.top)        
        console.log(`xpos ${xpos}  x ${boundingClientRect.x - parentPosition.left} y ${boundingClientRect.y - parentPosition.top}`)
        if(xpos > 0){
            //this.dimmerService.sendSwitchClickEvent(SwitchAction.ON);
            console.log('Switch Calling dimmer switch on')
            this.switchClicked.emit(SwitchAction.ON)
        }else{
            console.log('Switch Calling dimmer switch Off')
            //this.dimmerService.sendSwitchClickEvent(SwitchAction.OFF);
            this.switchClicked.emit(SwitchAction.OFF)
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

      dragSwitch() {
        // this.interval = setInterval(() => {
        //   if(this.timeLeft > 0) {
        //     this.timeLeft--;
        //   } else {
        //     this.timeLeft = 60;
        //   }
        // },1000)
        let switchHeight = Math.abs(this.item.nativeElement.scrollHeight)
        let containerHeight = Math.abs(this.container.nativeElement.scrollHeight)
        let displaceSwitchPosition = Math.abs(containerHeight - switchHeight/2);
        console.log(`switchHeight ${switchHeight} containerHeight ${containerHeight} displaceSwitchPosition ${displaceSwitchPosition}`)
        this.dragPosition = {x: displaceSwitchPosition, y: 0};
      }
}
