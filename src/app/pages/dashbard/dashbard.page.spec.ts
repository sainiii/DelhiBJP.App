import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashbardPage } from './dashbard.page';

describe('DashbardPage', () => {
  let component: DashbardPage;
  let fixture: ComponentFixture<DashbardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
