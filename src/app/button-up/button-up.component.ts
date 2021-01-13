import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollToService } from '../services/scroll-to/scroll-to.service';

@Component({
  selector: 'button-up',
  templateUrl: './button-up.component.html',
  styleUrls: ['./button-up.component.scss']
})
export class ButtonUpComponent implements OnInit {

  windowScrolled: boolean;

  constructor(private scrollToService: ScrollToService) { }

  ngOnInit(): void { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.windowScrolled = window.pageYOffset > 100;
  }

  scrollTop() {
    this.scrollToService.scrollTo({ container: 'body', offset: 0, duration: 800 });
  }

}
