import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { PxbAuthModule, PxbAuthUIService } from '@pxblue/angular-auth-workflow';
import {
    DrawerModule,
    EmptyStateModule,
    InfoListItemModule,
    SpacerModule,
    UserMenuModule,
} from '@pxblue/angular-components';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { PageOneComponent } from './pages/page-one/page-one.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PxbLogoComponent } from './components/pxb-logo/pxb-logo.component';
import { UserMenuComponent } from './navigation/user-menu/user-menu.component';
import { AuthUIService } from './services/auth-workflow/auth-ui/auth-ui.service';
import { GraphDisplayComponent } from './graph-display/graph-display.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AmbientTempComponent } from './ambient-temp/ambient-temp.component';
import { GaugeDisplayComponent } from './gauge-display/gauge-display.component';

const config = {
    apiKey: 'AIzaSyD8IZF95ybYZrA2cYwxugNrUilYnGa0le0',
    authDomain: 'gspdemo-645bc.firebaseapp.com',
    databaseURL: 'https://gspdemo-645bc-default-rtdb.firebaseio.com',
    projectId: 'gspdemo-645bc',
    storageBucket: 'gspdemo-645bc.appspot.com',
    messagingSenderId: '523552938142'
};

@NgModule({
    declarations: [
        AppComponent,
        GraphDisplayComponent,
        GaugeDisplayComponent,
        AuthComponent,
        NavigationComponent,
        HomeComponent,
        PageOneComponent,
        PxbLogoComponent,
        UserMenuComponent,
        AmbientTempComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        DrawerModule,
        InfoListItemModule,
        SpacerModule,
        EmptyStateModule,
        PxbAuthModule,
        UserMenuModule,
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule, // storage
        ChartsModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: 'APP_NAME',
            useValue: 'PXB_AUTH_DEMO_APP',
        },
        {
            provide: PxbAuthUIService,
            useClass: AuthUIService,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
