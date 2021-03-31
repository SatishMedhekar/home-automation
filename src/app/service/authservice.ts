import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

    _userActionOccured: Subject<void> = new Subject();
    get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };

    notifyUserAction() {
        this._userActionOccured.next();
    }

    loginUser() {
        console.log('user login');
    }

    logOutUser() {
        console.log('user logout');
    }

}