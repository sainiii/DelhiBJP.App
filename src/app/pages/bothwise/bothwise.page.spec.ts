import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BothwisePage } from './bothwise.page';

describe('BothwisePage', () => {
  let component: BothwisePage;
  let fixture: ComponentFixture<BothwisePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BothwisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
