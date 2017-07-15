import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments:FirebaseListObservable<any>;
  comment = {name: '', comment: ''};
  constructor(private _AngularFireDatabase:AngularFireDatabase) {
    this.comments = _AngularFireDatabase.list('/comments');
  }

  ngOnInit() {
  }

  postComment() {
    // this.comments.push(this.comment);
    this._AngularFireDatabase.list('/comments').push(this.comment);
  }

}
