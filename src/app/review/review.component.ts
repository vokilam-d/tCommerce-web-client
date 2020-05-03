import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductReviewDto } from '../shared/dtos/product-review.dto';
import { StoreReviewDto } from '../shared/dtos/store-review.dto';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  isCommentFormVisible: boolean = false;

  @Input() review: Partial<ProductReviewDto & StoreReviewDto>;
  @Input() canLeaveComment: boolean = true;
  @Output('vote') voteEmitter = new EventEmitter();
  @Output('downvote') downvoteEmitter = new EventEmitter();
  @Output('addComment') addCommentEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleCommentForm(state: boolean = !this.isCommentFormVisible) {
    this.isCommentFormVisible = state;
  }

  vote() {
    this.voteEmitter.emit();
  }

  downvote() {
    this.downvoteEmitter.emit();
  }

  onCommentFormSubmit(value: any) {
    this.addCommentEmitter.emit(value);
    this.isCommentFormVisible = false;
  }
}
