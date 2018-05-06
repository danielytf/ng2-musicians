import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const musicians = [
      { id: 11, name: 'Bruno Mars' },
      { id: 12, name: 'Michael Jackson' },
      { id: 13, name: 'Justin Timberlake' },
      { id: 14, name: 'Jessi J' },
      { id: 15, name: 'Wang Lee Hom' },
      { id: 16, name: 'Jay Chow' },
      { id: 17, name: 'Aerosmith' },
      { id: 18, name: 'Planetshakers' },
      { id: 19, name: 'Hillsongs' },
      { id: 20, name: 'Westlife' }
    ];
    return { musicians };
  }
}