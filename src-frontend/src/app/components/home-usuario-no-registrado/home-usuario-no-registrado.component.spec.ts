import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUsuarioNoRegistradoComponent } from './home-usuario-no-registrado.component';

describe('HomeUsuarioNoRegistradoComponent', () => {
  let component: HomeUsuarioNoRegistradoComponent;
  let fixture: ComponentFixture<HomeUsuarioNoRegistradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUsuarioNoRegistradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUsuarioNoRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
