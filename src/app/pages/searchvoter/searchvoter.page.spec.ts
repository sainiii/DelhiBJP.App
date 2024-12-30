import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchvoterPage } from './searchvoter.page';

describe('SearchvoterPage', () => {
  let component: SearchvoterPage;
  let fixture: ComponentFixture<SearchvoterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchvoterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
