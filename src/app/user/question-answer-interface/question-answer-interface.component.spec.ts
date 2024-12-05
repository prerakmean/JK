import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerInterfaceComponent } from './question-answer-interface.component';

describe('QuestionAnswerInterfaceComponent', () => {
  let component: QuestionAnswerInterfaceComponent;
  let fixture: ComponentFixture<QuestionAnswerInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnswerInterfaceComponent]
    });
    fixture = TestBed.createComponent(QuestionAnswerInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
