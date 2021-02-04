import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { PxbAuthGuard, AUTH_ROUTES, getAuthSubRoutes } from '@pxblue/angular-auth-workflow';
import { APP_NAV_ITEMS } from './navigation/nav-items';
import { NavigationComponent } from './navigation/navigation.component';
import { GraphDisplayComponent } from './graph-display/graph-display.component';
import { GaugeDisplayComponent } from './gauge-display/gauge-display.component';

const authWorkflowRoutes = getAuthSubRoutes();
const routes: Routes = [
    { path: '', redirectTo: AUTH_ROUTES.AUTH_WORKFLOW, pathMatch: 'full' },
    { path: AUTH_ROUTES.AUTH_WORKFLOW, component: AuthComponent, children: authWorkflowRoutes },
    {
        path: '',
        canActivate: [PxbAuthGuard],
        component: NavigationComponent,
        children: [
            { path: APP_NAV_ITEMS.graph.route, component: GraphDisplayComponent },
            { path: APP_NAV_ITEMS.gauge.route, component: GaugeDisplayComponent },
        ],
    },
];
// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
