import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ResultsComponent } from './components/results/results.component';
import { TermsComponent } from './components/terms/terms.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path:'',component: ContentComponent},
  {path:'content',component: ContentComponent},
  {path:'results',component: ResultsComponent},
  {path:'terms',component: TermsComponent},
  {path:'details',component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
