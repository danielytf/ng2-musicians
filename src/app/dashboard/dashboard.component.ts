import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';


import { Musician } from '../musician';
import { MusicianService } from '../musician.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    animations: [
        trigger('flyInOut', [
          state('in', style({opacity: 1, transform: 'translateX(0)'})),
          transition('void => *', [
            style({
              opacity: 0,
              transform: 'translateX(-100%)'
            }),
            animate('0.2s ease-in')
          ]),
          transition('* => void', [
            animate('0.2s 0.1s ease-out', style({
              opacity: 0,
              transform: 'translateX(100%)'
            }))
          ])
        ])
      ]
})
export class DashboardComponent implements OnInit {
    musicians: Musician[] = [];

    constructor(private musicianService: MusicianService) { }

    ngOnInit() {
        this.getMusicians();
    }

    getMusicians(): void {
        this.musicianService.getMusicians()
            .subscribe(musicians => this.musicians = musicians.slice(1, 5));
    }
}