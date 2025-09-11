import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerSidebarComponent } from './drawer-sidebar.component';

describe('DrawerSidebarComponent', () => {
  let component: DrawerSidebarComponent;
  let fixture: ComponentFixture<DrawerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
