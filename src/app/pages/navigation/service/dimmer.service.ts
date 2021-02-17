import {Injectable} from '@angular/core'
import { Observable, Subject } from 'rxjs';
import { SwitchAction } from 'src/app/interfaces/enum';

@Injectable({
    providedIn: 'root'
})

export class DimmerService{
    private subject = new Subject<any>();

    sendSwitchClickEvent(switchAction:SwitchAction){
        this.subject.next(switchAction);
    }

    getSwitchClickEvent():Observable<SwitchAction>{
        return this.subject.asObservable();
    }
}
