import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { IMenu, IMenuDetail } from '../../../interfaces/imenu'
import { Menu } from '../../../interfaces/enum';
import { MenuService } from '../service/menu.service';

@Component({
    selector: 'left-navigation',
    templateUrl: './left-navigation.component.html',
    styleUrls: ['./left-navigation.component.css']
})

export class LeftNavigation {
    @Input() leftMenu: IMenu;
    lMenu: Array<any>;


    constructor(private menuService: MenuService) {
        this.lMenu = [];
    }

    ngOnInit() {
        // this.lMenu= this.setImagePath();
    }

    /*****The logic here is to use ngOnChange.  rightNavigation component uses 
     * BehaviourSubject to subscribe  */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['leftMenu'])
            this.lMenu = this.setImagePath();
    }

    setImagePath(): Array<any> {
        let lmenus: Array<any> = [];
        if (!this.leftMenu.menuDetail) return;

        this.leftMenu.menuDetail.forEach(a => {
            let lmenu = {
                id: a.id,
                displayOrder: a.displayOrder,
                name: a.name,
                imgPath: this.menuService.getMenuImage(a.name), // a.imagePath + a.imageFileName,
                routerLink: a.name == 'Light' ? 'lightcontrol' : ''
            }

            lmenus.push(lmenu);
        })
        return lmenus;
    }

}