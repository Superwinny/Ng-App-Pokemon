import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',


})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;


  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) { }

  ngOnInit() {

    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
     this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon);// S'abonner au flux de donné qui va faire une requette réseaux qui retourne une liste de pokemon 
    }

  }

  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }
  goToEditPokemon(pokemon: Pokemon) { // Méthode redirige au click sur le formulaire d'édition des pokemons
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
