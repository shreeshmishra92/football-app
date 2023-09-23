import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFixtureComponent } from './team-fixture.component';

describe('TeamFixtureComponent', () => {
  let component: TeamFixtureComponent;
  let fixture: ComponentFixture<TeamFixtureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFixtureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
