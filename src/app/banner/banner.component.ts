import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BannerService } from '../services/banner/banner.service';
import { BannerItemDto } from '../shared/dtos/banner-item.dto';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { UPLOADED_HOST } from '../shared/constants';
import { ProductLabelTypeEnum } from '../shared/enums/product-label-type.enum';
import { DeviceService } from '../services/device-detector/device.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends NgUnsubscribe implements OnInit, AfterViewInit {

  banner: BannerItemDto[];
  uploadedHost = UPLOADED_HOST;

  private slideWidth: number = 0;
  private slideIndex: number = 0;
  private slideChangeTime = 2000;

  private swipeCoord: [number, number];
  private swipeTime: number;

  isDeviceMobile: boolean;

  @ViewChild('sliderListRef') sliderListRef: ElementRef;
  @ViewChild('sliderTrackRef') sliderTrackRef: ElementRef;

  constructor(
    private bannerService: BannerService,
    private deviceService: DeviceService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isDeviceMobile = this.deviceService.isMobile();
    this.getBanner();
  }

  ngAfterViewInit() {
    this.getSlideWidth();
  }

  private getBanner() {
    this.bannerService.fetchBanner()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.banner = response.data;

        this.banner.forEach(bannerItem => {
          this.setDiscountValue(bannerItem);
        });

        if (this.isDeviceMobile) {
          this.showSlides();
        }
      });
  }

  public setBannerItemSrc(bannerItem) {
    const bannerItemUrl = bannerItem?.media?.variantsUrls?.original;
    return `${this.uploadedHost}${bannerItemUrl}`;
  }

  public getLabelClass(bannerItem: BannerItemDto) {
    switch (bannerItem?.label.type) {
      case ProductLabelTypeEnum.New:
        return 'banner__label--new';
      case ProductLabelTypeEnum.Top:
        return 'banner__label--top';
    }
  }

  private setDiscountValue(bannerItem) {
    if (!bannerItem.oldPrice) { return; }
    bannerItem.discountValue = Math.ceil((bannerItem.oldPrice - bannerItem.price) / bannerItem.oldPrice * 100);
  }

  private getSlideWidth() {
    if (this.deviceService.isPlatformServer()) { return; }
    this.slideWidth = this.sliderListRef.nativeElement.getBoundingClientRect().width;
  }

  public swipe(e: TouchEvent, action: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (action === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (action === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000
        && Math.abs(direction[0]) > 30
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
        const swipe = direction[0] < 0 ? 'next' : 'previous';

        if (swipe === 'next') {
          if (this.slideIndex < this.banner.length - 1) {
            this.slideIndex += 1;
          } else {
            this.slideIndex = 0;
          }
          this.updateSliderPosition();
        } else {
          if (this.slideIndex > 0) {
            this.slideIndex -= 1;
            this.updateSliderPosition();
          }
        }
      }
    }
  }

  private showSlides() {
    if (this.slideIndex === this.banner.length) {
      this.slideIndex = 0;
    }

    this.updateSliderPosition();

    setTimeout(() => {
      this.slideIndex++;
      this.showSlides();
    }, this.slideChangeTime);
  }

  private updateSliderPosition() {
    this.sliderTrackRef.nativeElement.style.transition = 'transform 0.5s';
    this.sliderTrackRef.nativeElement.style.transform = `translate3d(-${this.slideIndex * this.slideWidth}px, 0px, 0px)`;
  }

  public getSlideActiveClass(index: number) {
    if (this.slideIndex === index) {
      return 'slider__dot--active';
    }
  }
}
