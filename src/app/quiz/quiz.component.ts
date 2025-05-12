import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Question } from '../question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(private service: GeneralService) {}
  selectedOption = '';
  index = 0;
  score = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  totalquestions = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  isQuizCompleted = false;
  questions: Question | null = null;
  isAnswered = false;
  selectedAnswers: string[] = [];
  showans = false;
  allquestions: Question[] = [];
  ngOnInit(): void {
    const timer = setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
      if (this.seconds % 15 === 0) {
        if (this.index < this.totalquestions - 1) {
          this.showNext();
        } else {
          this.submitQuiz();
        }
      }
      if (this.seconds === 60) {
        this.minutes++;
        this.seconds = 0;
        alert('Time is up');
        console.log('minutes after seconds ', this.minutes);
        if (this.minutes === 60) {
          this.hours++;
          this.minutes = 0;
          console.log('minutes in hours', this.minutes);
          console.log('hours : ', this.hours);

          if (this.minutes === 60) {
            this.isQuizCompleted = true;
            this.submitQuiz();
            clearInterval(timer);
          }
        }
      }
      if (this.isQuizCompleted === true) {
        clearInterval(timer);
      }
    }, 1000);

    this.service.getQuestions().subscribe((data) => {
      console.log(data);
      this.allquestions = data;
      this.totalquestions = this.allquestions.length;
      console.log(this.totalquestions);
    });
    this.service.getQuestionById(this.index + 1).subscribe((data) => {
      this.questions = data;
      console.log(this.questions, typeof this.questions);
    });
  }

  quizscore(selectedOption: string) {
    this.isAnswered = true;
    this.selectedAnswers[this.index] = selectedOption;
    if (selectedOption === this.questions?.correctAnswer) {
      this.correctAnswer++;
      this.score++;
    }
    if (selectedOption !== this.questions?.correctAnswer) {
      this.incorrectAnswer++;
      console.log(this.incorrectAnswer);
    }
    console.log('score : ', this.score);
  }

  showPrevious() {
    if (this.index <= 0) return;

    this.index--;
    this.service.getQuestionById(this.index + 1).subscribe({
      next: (data) => {
        this.questions = data;

        const savedAnswer = this.selectedAnswers[this.index];
        if (savedAnswer) {
          this.selectedOption = savedAnswer;
          this.isAnswered = true;
        } else {
          this.selectedOption = '';
          this.isAnswered = false;
        }

        this.showanswer();
      },
      error: (err) => {
        console.error(err);
        alert('No more questions available');
      },
    });
  }

  showNext() {
    console.log('next clicked');
    console.log(this.index + 1);
    this.quizscore(this.selectedOption);
    this.showans = false;

    if (this.index === this.totalquestions - 1) {
      this.isQuizCompleted = true;
      this.submitQuiz();
      this.isAnswered = false;
      return;
    }

    this.service.getQuestionById(this.index + 2).subscribe((data) => {
      this.questions = data;
      this.index++;
      console.log(this.questions);
    });
    const savedAnswer = this.selectedAnswers[this.index];
    if (savedAnswer) {
      this.selectedOption = savedAnswer;
      this.isAnswered = true;
    } else {
      this.selectedOption = '';
      this.isAnswered = false;
    }
  }
  isLastQuestion(): boolean {
    return this.index === this.totalquestions - 1;
  }
  submitQuiz() {
    if (!this.isAnswered) {
      this.quizscore(this.selectedOption);
    }
    this.isQuizCompleted = true;
    // const element = document.getElementById('btn-next');
    // if (element && this.isQuizCompleted === true) {
    //   element.setAttribute('disabled', 'false');
    // }
  }

  restartQuiz() {
    window.location.reload();
  }

  showanswer() {
    this.showans = true;
  }
}
