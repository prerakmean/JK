import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngestionComponent } from './ingestion.component';

describe('IngestionComponent', () => {
  let component: IngestionComponent;
  let fixture: ComponentFixture<IngestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngestionComponent]
    });
    fixture = TestBed.createComponent(IngestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
