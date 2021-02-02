import { Component } from '@angular/core';
import { AUTH_ROUTES, PxbAuthSecurityService } from '@pxblue/angular-auth-workflow';
import { Router } from '@angular/router';
import { UserDetailService } from 'src/app/services/auth-workflow/user-detail.service';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
    open = false;

    constructor(
        private readonly _router: Router,
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _userDetailService: UserDetailService
    ) {}

    logout(): void {
        this._userDetailService.logout();
        this._pxbSecurityService.updateSecurityState({ isAuthenticatedUser: false });
        void this._router.navigate([AUTH_ROUTES.AUTH_WORKFLOW]);
    }
}
