import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarEmpleadosComponent } from './agregar-editar-empleados.component';

describe('AgregarEditarEmpleadosComponent', () => {
  let component: AgregarEditarEmpleadosComponent;
  let fixture: ComponentFixture<AgregarEditarEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarEmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
