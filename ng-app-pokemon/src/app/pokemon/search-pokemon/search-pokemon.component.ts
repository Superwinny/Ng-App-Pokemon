import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';
@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',

})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>(); // searchTerm sert a construire ce flux de donné
  pokemons$: Observable<Pokemon[] | any>;


  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      //{..."a"..."ab"..."abz"..."ab"..."abc"...}
      debounceTime(300),
      //{......"ab"......"ab"..."abc"......}
      distinctUntilChanged(),
      //{......"ab"........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term)),
      //{......pokemonList(ab).........pokemonList(abc)......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term) // Next utilisé pour pousser un elément dans le flux de donné
  }
  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link);
  }

}
