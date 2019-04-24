import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {CreateMoqComponent} from './create-moq/create-moq.component';
import {ViewMoqComponent} from './view-moq/view-moq.component';

const routes: Routes = [{
  path: 'createmoq',
  component: CreateMoqComponent
},
{
  path: 'viewmoq',
  component: ViewMoqComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoqRoutingModule { }
