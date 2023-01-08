import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { FileComponent } from './file/file.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UrlComponent } from './url/url.component';

const routes: Routes = [
  {path:"login", component:LoginComponent}, 
  {path:"register", component:RegisterComponent},
  {path:"delete_account", component:DeleteAccountComponent},
  {path:"url", component:UrlComponent},
  {path:"file", component:FileComponent},
  {path:"home", component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
