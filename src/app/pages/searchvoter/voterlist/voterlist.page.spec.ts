import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoterlistPage } from './voterlist.page';

describe('VoterlistPage', () => {
  let component: VoterlistPage;
  let fixture: ComponentFixture<VoterlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
