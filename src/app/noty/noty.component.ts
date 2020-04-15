import { Component, OnInit } from '@angular/core';
import { NotyService } from './noty.service';
import { INoty } from './noty.interface';

@Component({
  selector: 'noty',
  templateUrl: './noty.component.html',
  styleUrls: ['./noty.component.scss']
})
export class NotyComponent implements OnInit {

  noties: INoty[] = [];
  private counter: number = 0;
  private timeToAutoHide: number = 5000;

  constructor(private notyService: NotyService) { }

  ngOnInit() {
    this.notyService.showNoty$.subscribe(
      noty => {
        this.showNoty({
          id: this.counter++,
          isHiding: false,
          ...noty
        });
      }
    );
  }

  private showNoty(noty: INoty) {
    this.noties.push(noty);

    if (noty.type === 'error') {
      setTimeout(() => this.removeAllNotiesExcept(noty), 300);
    } else {
      setTimeout(() => this.hideNoty(noty), this.timeToAutoHide);
    }
  }

  hideNoty(noty: INoty) {
    noty.isHiding = true;

    setTimeout(() => {
      const index = this.noties.findIndex(notyItem => notyItem.id === noty.id);
      if (index > -1) {
        this.noties.splice(index, 1);
      }
    }, 1000);
  }

  private removeAllNotiesExcept(notyArg: INoty) {
    this.noties = this.noties.filter(noty => noty.id === notyArg.id);
  }
}
