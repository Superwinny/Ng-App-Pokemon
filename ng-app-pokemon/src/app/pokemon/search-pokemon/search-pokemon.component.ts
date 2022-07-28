import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  
})
export class SearchPokemonComponent implements OnInit {

  searchTerms = new Subject <string>(); // searchTerm sert a construire ce flux de donné
  pokemons$: Observable<Pokemon[]>;
 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(term: string){
    this.searchTerms.next(term) // Next utilisé pour pousser un elément dans le flux de donné
  }
  goToDetail(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link);
  }

}
