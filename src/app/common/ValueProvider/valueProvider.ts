import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValueCollection } from './tagValue';
import { UserDetailService } from '../../services/auth-workflow/user-detail.service';

@Injectable({
    providedIn: 'root',
})
export class ValueProvider {
    private readonly host = 'https://' + 'gspwatcher.westeurope.cloudapp.azure.com:1880/';
    private readonly hostGet = `${this.host  }get/`;
    private readonly hostSet = `${this.host  }set/`;

    constructor(private readonly http: HttpClient, private readonly _userDetailService: UserDetailService) {}

    getValue(id: number): Observable<ValueCollection> {
        const path = this.hostGet + id.toString();
        const response = this.http.get<ValueCollection>(path);

        return response;
    }

    get<T>(path: string): Observable<T> {
      const fullPath = this.host + path;
        const response = this.http.get<T>(fullPath);

        return response;
    }

    setValue(id: number, value: any) : void {
        let convertedValue: any = value;

        //convert bool to 1/0
        if (typeof value === 'boolean') convertedValue = value ? 1 : 0;

        if (this._userDetailService.gspKey === null) return;
        const request =
            `{ "key": "${  this._userDetailService.gspKey  }", "set" : { "${  id  }" : "${  convertedValue  }" } }`;
        this.http.post<ValueCollection>(this.hostSet, request).subscribe(this._onSetValueDone);
    }

    private _onSetValueDone(data: ValueCollection):void {}
}
