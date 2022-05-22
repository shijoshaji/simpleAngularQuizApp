import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionsService } from '../service/questions.service'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public userName: string = '';
  public questionList: any = []
  public currentQuestion: number = 0
  public points: number = 0
  public counter: number = 60
  rightAnswerCount: number = 0
  wrongAnswerCount: number = 0
  interval$: any
  progressValue: string = '0'
  attemptNumber: number = 0
  isQuizCompleted: boolean = false



  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')!;
    this.getAllQuestions()
    this.startTimer()
  }

  getAllQuestions() {
    this.questionService.getQuestionsJSON()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }



  getProgressBarPercent() {
    this.progressValue = ((this.currentQuestion / this.questionList.length) * 100).toString()
    return this.progressValue
  }


  startTimer() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60
          this.points -= 5
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 60000)

  }
  stopTimer() {
    this.interval$.unsubscribe()
    this.counter = 0

  }
  resetTimer() {
    this.stopTimer()
    this.counter = 60
    this.startTimer()
  }

  resetQuiz() {
    this.resetTimer()
    this.getAllQuestions()
    this.points = 0
    this.currentQuestion = 0
    this.progressValue = '0'
    this.rightAnswerCount = this.wrongAnswerCount = 0
  }

  nextQuestion(questionNumber: number) {
    this.currentQuestion++
    this.resetTimer()
    this.getProgressBarPercent()
    if (questionNumber === this.questionList.length) {
      this.isQuizCompleted = true
      this.stopTimer()
    }
  }

  prevQuestion() {
    this.currentQuestion--
    this.resetTimer()
    this.getProgressBarPercent()
  }


  selectedAnswer(questionNumber: number, optionSelected: any) {


    if (optionSelected.correct) {
      this.points += 10
      this.rightAnswerCount++
    }
    else {
      this.points -= 5
      this.wrongAnswerCount++
    }
    setTimeout(() => {
      this.currentQuestion++
      this.resetTimer();
      this.getProgressBarPercent();

    }, 1000)

    this.attemptNumber++
    if (questionNumber === this.questionList.length) {
      setTimeout(() => {
        this.isQuizCompleted = true
        this.stopTimer()

      }, 1000)

    }



  }

}
