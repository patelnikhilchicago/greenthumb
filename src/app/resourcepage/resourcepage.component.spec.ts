import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcepageComponent } from './resourcepage.component';

describe('ResourcepageComponent', () => {
  let component: ResourcepageComponent;
  let fixture: ComponentFixture<ResourcepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
