import { Component, OnInit } from '@angular/core';
import { BannerService } from '../services/banner/banner.service';
import { BannerItemDto } from '../shared/dtos/banner-item.dto';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { UPLOADED_HOST } from '../shared/constants';
import { ProductLabelTypeEnum } from '../shared/enums/product-label-type.enum';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends NgUnsubscribe implements OnInit {

  banner: BannerItemDto[];
  uploadedHost = UPLOADED_HOST;

  constructor(private bannerService: BannerService) {
    super();
  }

  ngOnInit(): void {
    this.getBanner();
  }

  getBanner() {
    this.bannerService.fetchBanner()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.banner = response.data;

        this.banner.forEach(bannerItem => {
          this.setDiscountValue(bannerItem);
        });
      });
  }

  setBannerItemSrc(bannerItem) {
    const bannerItemUrl = bannerItem?.media?.variantsUrls?.original;
    return `${this.uploadedHost}${bannerItemUrl}`;
  }

  getLabelClass(bannerItem: BannerItemDto) {
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
}
