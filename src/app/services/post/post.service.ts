import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePost } from 'src/app/interfaces/response-post.interface';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private configService: ConfigService, private http: HttpClient) {}

  private getPostsUrl(): string {
    return this.configService.getPostsUrl();
  }

  getPosts(): Observable<ResponsePost[]> {
    return this.http.get<ResponsePost[]>(this.getPostsUrl());
  }
}
