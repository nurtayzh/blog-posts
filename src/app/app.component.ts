import { Component, OnInit } from '@angular/core';
import { ResponsePost } from './interfaces/response-post.interface';
import { PostService } from './services/post/post.service';
import { Post } from './interfaces/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe({
      next: (responsePosts) => this.setPosts(responsePosts),
      error: (error) => this.showError(error),
    });
  }

  setPosts(responsePosts: ResponsePost[]): void {
    this.posts = responsePosts.map((responsePost) => ({
      tag: this.getTag(responsePost),
      title: responsePost.title?.rendered,
      date: responsePost.date_gmt,
      author: this.getAuthor(responsePost),
      author_link: this.getAuthorLink(responsePost),
      article_link: responsePost.link,
      image_link: responsePost.featured_media,
    }));
  }

  getTag(responsePost: ResponsePost): string {
    const terms = responsePost._embedded?.['wp:term'];
    const tagNames = terms?.flatMap((term) => term.map((tag) => tag.name));
    return tagNames?.[tagNames.length - 1] || '';
  }

  getAuthor(responsePost: ResponsePost): string {
    const authors = responsePost._embedded?.author;
    const authorNames = authors?.map((author) => author.name);
    return authorNames?.[authorNames.length - 1] || '';
  }

  getAuthorLink(responsePost: ResponsePost): string {
    const authors = responsePost._embedded?.author;
    const authorLinks = authors?.map((author) => author.link);
    return authorLinks?.[authorLinks.length - 1] || '';
  }

  showError(error: any): void {
    alert(error.message || error.statusText || 'Unknown error: see console');
    console.error(error);
  }
}
