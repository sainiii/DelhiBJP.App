import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectionresultPage } from './electionresult.page';

describe('ElectionresultPage', () => {
  let component: ElectionresultPage;
  let fixture: ComponentFixture<ElectionresultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
