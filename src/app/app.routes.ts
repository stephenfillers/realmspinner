import { Routes } from '@angular/router';
import { SignInComponent } from './public/sign-in/sign-in.component';
import { SignUpComponent } from './public/sign-up/sign-up.component';
import { ToolsComponent } from './private/tools/tools.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'tools', component: ToolsComponent },
];
