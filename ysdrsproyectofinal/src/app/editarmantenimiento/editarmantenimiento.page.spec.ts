import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarmantenimientoPage } from './editarmantenimiento.page';

describe('EditarmantenimientoPage', () => {
  let component: EditarmantenimientoPage;
  let fixture: ComponentFixture<EditarmantenimientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarmantenimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
