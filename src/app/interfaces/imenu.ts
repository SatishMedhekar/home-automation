import { Menu } from './enum';

interface IMenu {
    menuType?: Menu;
    menuDetail?: IMenuDetail[];
}

interface IMenuDetail {
    id?: string;
    displayOrder?: number;
    name?: string;
    imagePath?: string;
    imageFileName?: string;
    routerLink?: string;
}

export { IMenu, IMenuDetail };