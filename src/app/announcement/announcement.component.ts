import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from '../services/announcement/announcement.service';
import { AnnouncementDto } from '../shared/dtos/announcement.dto';
import { DEFAULT_ERROR_TEXT } from '../shared/constants';
import { DeviceService } from '../services/device-detector/device.service';

@Component({
  selector: 'announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  public announcementHeight: number;
  public announcement: AnnouncementDto;
  public fetchError: string | null = null;

  public type: 'winterHolidays' | 'springHolidays' | 'attention';

  @ViewChild('announcementRef', { read: ElementRef }) announcementEl: ElementRef;

  constructor(
    private announcementService: AnnouncementService,
    private changeDetectorRef: ChangeDetectorRef,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.type = 'winterHolidays';
    this.fetchAnnouncement();
  }

  private fetchAnnouncement() {
    return this.announcementService.getAnnouncement().subscribe(
      response => {
        this.announcement = response.data;

        this.changeDetectorRef.detectChanges();

        if (this.deviceService.isPlatformBrowser()) {
          this.announcementHeight = this.announcementEl.nativeElement.getBoundingClientRect().height;
          document.body.style.marginTop = `${this.announcementHeight}px`;
        }
      },
      error => this.fetchError = error.error?.message || DEFAULT_ERROR_TEXT
    );
  }
}
