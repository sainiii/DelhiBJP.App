import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoterregistratoinPage } from './voterregistratoin.page';

describe('VoterregistratoinPage', () => {
  let component: VoterregistratoinPage;
  let fixture: ComponentFixture<VoterregistratoinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterregistratoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
