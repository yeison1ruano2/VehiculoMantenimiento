import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculodetallePage } from './vehiculodetalle.page';

describe('VehiculodetallePage', () => {
  let component: VehiculodetallePage;
  let fixture: ComponentFixture<VehiculodetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehiculodetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
