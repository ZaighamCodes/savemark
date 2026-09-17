import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { Bookmark, BookmarkService } from '../../services/bookmark';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Navbar, FormsModule],
})
export class Home implements OnInit {
  private bookmarkService = inject(BookmarkService);
  private cdr = inject(ChangeDetectorRef);
  bookmarks: Bookmark[] = [];
  formOpen = false;
  editingId: number | null = null;
  form = {
    title: '',
    description: '',
    url: '',
  };

  ngOnInit(): void {
    console.log("home init")
    this.loadBookmarks();
    console.log(this.bookmarks);
  }

  loadBookmarks() {
    this.bookmarkService.getBookmarks().subscribe({
      next: (response) => {
        this.bookmarks = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('error from server', error);
      },
    });
  }

  openCreate() {
    this.editingId = null;
    this.form = { title: '', description: '', url: '' };
    this.formOpen = true;
  }

  openEdit(bookmark: Bookmark) {
    this.editingId = bookmark.bookmarkId;
    this.form = {
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
    };
    this.formOpen = true;
  }

  closeForm() {
    this.formOpen = false;
    this.editingId = null;
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeForm();
    }
  }

  saveBookmark() {
    if (!this.form.title.trim() || !this.form.description.trim() || !this.form.url.trim()) {
      return;
    }

    if (this.editingId) {
      this.bookmarks = this.bookmarks.map((bookmark) =>
        bookmark.bookmarkId === this.editingId ? { ...bookmark, ...this.form } : bookmark,
      );
      this.closeForm();
      return;
    }

    const payload = {
      title: this.form.title,
      url: this.form.url,
      description: this.form.description,
    };

    this.closeForm();
    this.bookmarkService.createBookmark(payload).subscribe({
      next: () => this.loadBookmarks(),
      error: (error) => {
        console.log('error from server', error);
        this.loadBookmarks();
      },
    });
  }

  deleteBookmark(id: number) {
    console.log('Deleting bookmark with ID:', id);
      this.bookmarkService.deleteBookmark(id).subscribe({
      next: () => this.loadBookmarks(),
      error: (error) => {
        console.log('error from server', error);
        this.loadBookmarks();
      },
    });
  }
}
