import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Musician } from '../musician';
import { MusicianService } from '../musician.service';

@Component({
    selector: 'app-musician-detail',
    templateUrl: './musician-detail.component.html',
    styleUrls: ['./musician-detail.component.css']
})
export class MusicianDetailComponent implements OnInit {
    @Input() musician: Musician;

    constructor(
        private route: ActivatedRoute,
        private musicianService: MusicianService,
        private location: Location

    ) { }

    ngOnInit() {
        this.getHero();
    }

    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.musicianService.getMusician(id)
            .subscribe(musician => this.musician = musician);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.musicianService.updateMusician(this.musician)
            .subscribe(() => this.goBack());
    }
}