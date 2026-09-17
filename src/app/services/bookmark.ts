import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface BookmarkPayload {
  title: string;
  url: string;
  description: string;
}

export interface Bookmark {
  bookmarkId: number;
  title: string;
  url: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private http = inject(HttpClient);
  // private baseUrl = 'http://localhost:8080/';
    private baseUrl='https://bookmark-manager-2kyh.onrender.com/';

  getBookmarks() {
    return this.http.get<Bookmark[]>(this.baseUrl + 'users/bookmarks', {
      withCredentials: true,
    });
  }

  createBookmark(data: BookmarkPayload) {
    return this.http.post(this.baseUrl + 'users/bookmarks', data, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text',
    });
  }

  deleteBookmark(bookmarkId: number) {
    return this.http.delete(this.baseUrl + 'users/bookmarks/' + bookmarkId, {
      withCredentials: true,
      observe: 'response',
      responseType: 'text',
    });
  }
}
