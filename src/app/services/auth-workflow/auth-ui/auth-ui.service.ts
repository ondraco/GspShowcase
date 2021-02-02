/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { IPxbAuthUIService, PxbAuthSecurityService } from '@pxblue/angular-auth-workflow';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserDetailService } from '../user-detail.service';

const TIMEOUT_MS = 1500;

@Injectable({
    providedIn: 'root',
})
export class AuthUIService implements IPxbAuthUIService {
    constructor(
        private readonly _pxbSecurityService: PxbAuthSecurityService,
        private readonly _authService: AngularFireAuth,
        private readonly _userDetailService: UserDetailService
    ) {
        _authService
            .onAuthStateChanged((user) => {
                if (user) {
                    this._userDetailService.activeUser = user;
                    this._userDetailService.updateGSPKey();
                }
            })
            .catch(() => {
                this._userDetailService.logout();
            });
    }

    // This method is called at the start of the application to check if a remembered user is returning to the app and initiate pxb SecurityContext.
    initiateSecurity(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const authenticated = this._userDetailService.isAuthenticated();
                const active = this._userDetailService.activeUser;
                if (authenticated) {
                    console.log('User is authenticated.');
                    this._pxbSecurityService.onUserAuthenticated(active.email, undefined, true);
                    return resolve();
                }

                console.log('User is not authenticated and not remembered.');
                this._pxbSecurityService.onUserNotAuthenticated();

                return resolve();
            }, TIMEOUT_MS);
        });
    }

    login(email: string, password: string, remeberMe: boolean): Promise<void> {
        const persistence = remeberMe ? 'local' : 'none';
        return new Promise((resolve, reject) => {
            this._authService
                .setPersistence(persistence)
                .then(() => {
                    this._authService
                        .signInWithEmailAndPassword(email, password)
                        .then((c) => {
                            this._userDetailService.activeUser = c.user;
                            this._userDetailService.updateGSPKey();
                            return resolve();
                        })
                        .catch((error) => {
                            this._userDetailService.logout();

                            return reject({
                                title: 'Error!',
                                message: error,
                            });
                        });
                })
                .catch((error) => {
                    this._userDetailService.logout();

                    return reject({
                        title: 'Error!',
                        message: error,
                    });
                });
        });
    }

    forgotPassword(email: string): Promise<void> {
        console.log(`Performing a sample ForgotPassword request with the following credentials:\n email: ${email}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email.toLowerCase() === 'fail@test.com') {
                    return reject();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    changePassword(oldPassword: string, newPassword: string): Promise<void> {
        console.log(
            `Performing a sample ChangePassword request with the following credentials.\n  oldPassword: ${oldPassword}\n  newPassword: ${newPassword}`
        );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (newPassword.toLowerCase() === 'fail123!') {
                    return reject({
                        title: 'Error!',
                        message: 'This is an example of a custom error message.',
                    });
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }

    verifyResetCode(): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const resetCode = urlParams.get('code');
        console.log(`Performing a sample verifyResetCode request with the following credentials:\n code: ${resetCode}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!resetCode || resetCode.toUpperCase() === 'INVALID_LINK') {
                    return reject();
                }
                return resolve();
            }, 1000);
        });
    }

    setPassword(password: string): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const email = urlParams.get('email');

        console.log(
            `Performing a sample SetPassword request with the following credentials.\n  code: ${code}\n  password: ${password}\n  email: ${email}`
        );

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password.toLowerCase() === 'fail123!') {
                    return reject();
                }
                return resolve();
            }, TIMEOUT_MS);
        });
    }
}
