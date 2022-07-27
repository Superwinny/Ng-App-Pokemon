import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-liste-pokemon',
  templateUrl: './liste-pokemon.component.html',

})
export class ListePokemonComponent implements OnInit{
  pokemonList: Pokemon[];

constructor(
  private router: Router,
  private pokemonService: PokemonService
  ){}
  ngOnInit(){
     this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList); // S'abonner au flux de donné qui va faire une requette réseaux qui retourne une liste de pokemon 
  }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemons', pokemon.id]);
  }

}
