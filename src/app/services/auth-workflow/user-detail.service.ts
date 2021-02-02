import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root',
})
export class UserDetailService {
    constructor(private readonly _dataService: AngularFireDatabase) {}
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

    clear(): void {
      this.gspKey = null;
      this.activeUser = null;
      this.canWrite = false;
    }
}
