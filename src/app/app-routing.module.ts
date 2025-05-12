import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { AppComponent } from './app.component';
import { InstructionsComponent } from './instructions/instructions.component';

const routes: Routes = [
  { path: 'instructions', component: InstructionsComponent },
  {
    path: 'startQuiz',
    component: QuizComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
