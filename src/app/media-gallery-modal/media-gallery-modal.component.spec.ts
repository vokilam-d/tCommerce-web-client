import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGalleryModalComponent } from './media-gallery-modal.component';

describe('MediaGalleryModalComponent', () => {
  let component: MediaGalleryModalComponent;
  let fixture: ComponentFixture<MediaGalleryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaGalleryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaGalleryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
