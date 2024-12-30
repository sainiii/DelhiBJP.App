import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttandancePage } from './attandance.page';

describe('AttandancePage', () => {
  let component: AttandancePage;
  let fixture: ComponentFixture<AttandancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AttandancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
