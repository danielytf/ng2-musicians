import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Musician } from './musician';
import { MUSICIANS } from './mock-musicians';

import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class MusicianService {

    private musicianUrl = 'api/musicians';  // URL to web api

    constructor(private http: HttpClient,
        private messageService: MessageService) { }

    getMusician(id: number): Observable<Musician> {
        const url = `${this.musicianUrl}/${id}`;
        return this.http.get<Musician>(url).pipe(
            tap(_ => this.log(`fetched musician id=${id}`)),
            catchError(this.handleError<Musician>(`getMusician id=${id}`))
        );
    }

    getMusicians(): Observable<Musician[]> {
        return this.http.get<Musician[]>(this.musicianUrl)
            .pipe(
                tap(musicians => this.log(`fetched musicians`)),
                catchError(this.handleError('getMusicians', []))
            );
    }

    /** GET musician by id. Return `undefined` when id not found */
    getMusicianNo404<Data>(id: number): Observable<Musician> {
        const url = `${this.musicianUrl}/?id=${id}`;
        return this.http.get<Musician[]>(url)
            .pipe(
                map(musicians => musicians[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} musician id=${id}`);
                }),
                catchError(this.handleError<Musician>(`getMusician id=${id}`))
            );
    }

    searchMusicians(term: string): Observable<Musician[]> {
        if (!term.trim()) {
            // if not search term, return empty musician array.
            return of([]);
        }
        
        return this.http.get<Musician[]>(`api/musicians/?name=${term}`).pipe(
            tap(_ => this.log(`found musicians matching "${term}"`)),
            catchError(this.handleError<Musician[]>('searchMusicians', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addMusician(musician: Musician): Observable<Musician> {
        return this.http.post<Musician>(this.musicianUrl, musician, httpOptions).pipe(
            tap((musician: Musician) => this.log(`added musician w/ id=${musician.id}`)),
            catchError(this.handleError<Musician>('addMusician'))
        );
    }

    /** DELETE: delete the hero from the server */
    deleteMusician(musician: Musician | number): Observable<Musician> {
        const id = typeof musician === 'number' ? musician : musician.id;
        const url = `${this.musicianUrl}/${id}`;

        return this.http.delete<Musician>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted musician id=${id}`)),
            catchError(this.handleError<Musician>('deleteMusician'))
        );
    }

    /** PUT: update the hero on the server */
    updateMusician(musician: Musician): Observable<any> {
        return this.http.put(this.musicianUrl, musician, httpOptions).pipe(
            tap(_ => this.log(`updated musician id=${musician.id}`)),
            catchError(this.handleError<any>('updateMusician'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a MusicianService message with the MessageService */
    private log(message: string) {
        this.messageService.add('MusicianService: ' + message);
    }
}