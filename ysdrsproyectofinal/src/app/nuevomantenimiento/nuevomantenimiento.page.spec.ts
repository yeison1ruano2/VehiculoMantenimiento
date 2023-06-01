import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevomantenimientoPage } from './nuevomantenimiento.page';

describe('NuevomantenimientoPage', () => {
  let component: NuevomantenimientoPage;
  let fixture: ComponentFixture<NuevomantenimientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevomantenimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
