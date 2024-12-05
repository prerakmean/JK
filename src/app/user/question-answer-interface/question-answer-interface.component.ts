import { Component } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-question-answer-interface',
  templateUrl: './question-answer-interface.component.html',
  styleUrls: ['./question-answer-interface.component.scss']
})
export class QuestionAnswerInterfaceComponent {
  user_id: any;
  loader = false;
  question: string = '';
  answer: string | null = null;
  excerpts: string[] | null = null;


  constructor( private commonService: CommonService,) {
    this.user_id = localStorage.getItem('Unique_id') || '';
  }

  submitQuestion() {
    this.loader = true;
    let data ={
      question :this.question
    }
    this.commonService.askQuestion( this.user_id,data).subscribe(
    (res) => {
      if (res.status === 200) {
        this.loader = false;
        this.answer = res.data[0].answer;
        // this.excerpts = res.data.excerpts;
        this.commonService.displaySwal(res.message, 'Success!', 'success');
      
      } else {
        this.commonService.displaySwal(res.message, 'Info!', 'info');
      }
    },
    (err) => {
      this.loader = false;
      console.log(err);
    }
  );
  }
}
