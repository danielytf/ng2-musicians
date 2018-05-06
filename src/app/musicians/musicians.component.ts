import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';

import { Musician } from '../musician';
import { MUSICIANS } from '../mock-musicians';

import { MusicianService } from '../musician.service';

@Component({
    selector: 'app-musicians',
    templateUrl: './musicians.component.html',
    styleUrls: ['./musicians.component.css'],
    animations: [
        trigger('flyInOut', [
          state('in', style({transform: 'translateX(0)'})),
          transition('void => *', [
            animate(500, keyframes([
              style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
              style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
              style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
            ]))
          ]),
          transition('* => void', [
            animate(500, keyframes([
              style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
              style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
              style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
            ]))
          ])
        ])
      ]
})
export class MusiciansComponent implements OnInit {

    musicians: Musician[];

    constructor(private musicianService: MusicianService) { }

    ngOnInit() {
        this.getMusicians();
    }

    getMusicians(): void {
        this.musicianService.getMusicians()
            .subscribe(musicians => this.musicians = musicians);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }

        let id = this.getRndInteger(1000, 9999999);
        this.musicianService.addMusician({ id, name } as Musician)
            .subscribe(hero => {
                this.musicians.push(hero);
            });
    }

    delete(musician: Musician): void {
        this.musicians = this.musicians.filter(m => m !== musician);
        this.musicianService.deleteMusician(musician).subscribe();
    }

    private getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}