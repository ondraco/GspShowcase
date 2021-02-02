import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root',
})
export class UserDetailService {
    constructor(private readonly _dataService: AngularFireDatabase, private readonly _authService: AngularFireAuth) {}
    activeUser: firebase.User | null = null;
    errorMessage: string | null = null;
    gspKey: string | null = null;
    canWrite = false;

    updateGSPKey(): void {
        if (this.activeUser === null) {
            return;
        }
        const path = `/users/${this.activeUser.uid}/`;

        this._dataService
            .list(path)
            .valueChanges()
            .subscribe((x) => {
                this.gspKey = x[0] as string;
                this.canWrite = x[1] as boolean;
            });
    }

    isAuthenticated(): boolean {
        return this.activeUser !== null;
    }

    logout(): void {
        this.gspKey = null;
        this.activeUser = null;
        this.canWrite = false;
        void this._authService.signOut();
    }
}
