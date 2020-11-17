import { Component, Input, OnInit } from '@angular/core';
import { AdditionalServiceService } from '../services/additional-service.service';
import { AdditionalServiceDto } from '../../../shared/dtos/additional-service.dto';
import { NgUnsubscribe } from '../../../shared/directives/ng-unsubscribe.directive';
import { finalize, takeUntil } from 'rxjs/operators';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';

@Component({
  selector: 'additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.scss']
})
export class AdditionalServicesComponent extends NgUnsubscribe implements OnInit {

  additionalServices: AdditionalServiceDto[] = [];
  isLoading: boolean = false;
  fetchError: string;

  @Input() ids: number[];

  constructor(private additionalServiceService: AdditionalServiceService) {
    super();
  }

  ngOnInit(): void {
    if (this.ids) {
      this.fetchServices();
    }
  }

  getSelectedIds(): number[] {
    return this.additionalServices
      .filter(service => service.isSelected)
      .map(service => service.id);
  }

  private fetchServices() {
    this.fetchError = null;
    this.isLoading = true;

    this.additionalServiceService.fetchAdditionalServices(this.ids)
      .pipe( takeUntil(this.ngUnsubscribe), finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.additionalServices = response.data;
        },
        error => this.fetchError = error.error?.message || DEFAULT_ERROR_TEXT
      )
  }
}
