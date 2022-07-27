import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  constructor(private pokemonService: PokemonService,
    private router: Router
  ) { }

  // 5 Méthode pour le formulaire 

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
  }

  hasType(type: string): boolean { // Vérifie si le pokemon a ou a pas de type
    return this.pokemon.types.includes(type);
  }
  selectType($event: Event, type: string) { // Quand l'utilisateur clique sur une case à cocher
    const isChecked: Boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) { // Si la case est coché par l'ulilisateur
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }

  }
  isTypesValid(type: string): boolean{
     if(this.pokemon.types.length == 1 && this.hasType(type)){
      return false;
     }
     if(this.pokemon.types.length > 2 && !this.hasType(type)){
      return false;
     }

    return true
  }
  onSubmit() {
    console.log('Submit form !');
    this.router.navigate(['/pokemons', this.pokemon.id]); // Redirige l'utilisateur sur la page du pokemon qui vient d'etre modifier

  }
}
