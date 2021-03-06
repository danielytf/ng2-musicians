import { Component, OnInit } from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition,
    query,
    stagger
} from '@angular/animations';

import { Musician } from '../musician';
import { MUSICIANS } from '../mock-musicians';

import { MusicianService } from '../musician.service';

@Component({
    selector: 'app-musicians',
    templateUrl: './musicians.component.html',
    styleUrls: ['./musicians.component.css'],
    animations: [
        trigger('staggerIn', [
            transition('* => *', [
                query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
                query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
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