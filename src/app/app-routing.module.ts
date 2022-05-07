import {CartComponent} from '../../../../../Desktop/angular/02-03-2022/tienda-prueba/src/app/components/cart/cart.component';
import {SignerComponent} from '../../../../../Desktop/angular/02-03-2022/tienda-prueba/src/app/components/signer/signer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ResultsComponent } from './components/results/results.component';
import { TermsComponent } from './components/terms/terms.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path:'',component: ContentComponent},
  {path:'content',component: ContentComponent},
  {path:'signer',component: SignerComponent},
  {path:'results',component: ResultsComponent},
  {path:'cart',component: CartComponent},
  {path:'terms',component: TermsComponent},
  {path:'details',component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
