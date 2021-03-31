import { Component, OnInit } from '@angular/core';
import { SwitchAction } from "src/app/interfaces/enum";

@Component({
    selector: 'app-firstfloorzone1',
    templateUrl: './first-floor-zone1.component.html',
    styleUrls: ['./first-floor-zone1.component.css']
})
export class Firstfloorzone1Component implements OnInit {
    kitchenAction:SwitchAction;
    rumpusAction: SwitchAction;
    seasonRoomAction : SwitchAction;
    passageAction:SwitchAction;
    bathroomAction: SwitchAction;
    laundryAction : SwitchAction;

    kitchenDimmerAction: SwitchAction;

    constructor() { }

    ngOnInit() {
    }

    onKitchenClicked(switchAction:SwitchAction){
        console.log(`onKitchenClicked action ${switchAction}`)
        this.kitchenAction = switchAction
    }

    onRumpusClicked(switchAction:SwitchAction){
        console.log(`onRumpusClicked action ${switchAction}`)
        this.rumpusAction = switchAction
    }

    onSeasonRoomClicked(switchAction:SwitchAction){
        console.log(`onSeasonRoomClicked action ${switchAction}`)
        this.seasonRoomAction = switchAction
    }

    onPassageClicked(switchAction:SwitchAction){
        console.log(`onPassageClicked action ${switchAction}`)
        this.passageAction = switchAction
    }

    onBathroomClicked(switchAction:SwitchAction){
        console.log(`onBathroomClicked action ${switchAction}`)
        this.bathroomAction = switchAction
    }

    onLaundryClicked(switchAction:SwitchAction){
        console.log(`onLaundryClicked action ${switchAction}`)
        this.laundryAction = switchAction
    }

    onKitchenDimmerDrag(switchAction:SwitchAction){
        console.log(`onKitchenDimmerDrag action ${SwitchAction[switchAction]}`)
        this.kitchenDimmerAction = switchAction
    }
}
