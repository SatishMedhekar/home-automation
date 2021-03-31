import { Injectable } from '@angular/core';
import { IMenu, IMenuDetail } from '../../../interfaces/imenu'
declare var require: any;

@Injectable()
export class MenuService {

    getMenuImage(menu: string): string {
        let result: string;
        switch (menu.toLowerCase()) {
            case "light": {
                result = require("../../../images/Extras/light24.png");
                break;
            }
            case "music": {
                result = require("../../../images/Extras/music24.png");
                break;
            }
            case "message": {
                result = require("../../../images/Extras/message24.png");
                break;
            }
            case "weather": {
                result = require("../../../images/Extras/temperature24.png");
                break;
            }
            case "calendar": {
                result = require("../../../images/Extras/calendar24.png");
                break;
            }
            case "setting": {
                result = require("../../../images/Extras/settings-25-16.png");
                break;
            }
        }
        return result;
    }

}