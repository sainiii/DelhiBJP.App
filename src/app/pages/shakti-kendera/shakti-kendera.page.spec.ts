import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShaktiKenderaPage } from './shakti-kendera.page';

describe('ShaktiKenderaPage', () => {
  let component: ShaktiKenderaPage;
  let fixture: ComponentFixture<ShaktiKenderaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaktiKenderaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
