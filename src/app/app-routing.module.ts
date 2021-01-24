import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EksperimentComponent } from './components/eksperiment/eksperiment.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: 'rezultati', component:ResultsComponent },
  { path: '**', component:EksperimentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }