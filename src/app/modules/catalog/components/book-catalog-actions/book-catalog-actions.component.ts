import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UserMetadata } from 'src/app/core/models/metadata/user-metadata.model';
import { addBookToLibrary } from 'src/app/core/store/actions/library.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-book-catalog-actions',
  templateUrl: './book-catalog-actions.component.html',
  styleUrls: ['./book-catalog-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCatalogActionsComponent implements OnInit, OnDestroy {

  @Input()
  public bookMetadata: BookMetadata;

  private userMetadata: UserMetadata;
  private userMetadataSubscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router) { }

  public ngOnInit(): void {
    this.userMetadataSubscription = this.store.select(selectUserMetadata).subscribe(userMetadata => this.userMetadata = userMetadata);
  }

  public ngOnDestroy(): void {
    this.userMetadataSubscription.unsubscribe();
  }

  public onAddBookToLibrary(): void {
    this.store.dispatch(addBookToLibrary({ bookId: this.bookMetadata.id, userId: this.userMetadata.id }));
    this.router.navigate(['/dashboard/library', this.bookMetadata.id]);
  }

}
