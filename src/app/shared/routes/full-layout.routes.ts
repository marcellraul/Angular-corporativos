import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'corporativos',
    loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule)
  },

];
