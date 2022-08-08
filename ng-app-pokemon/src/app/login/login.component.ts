import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu2)';
  name: string;
  password: string;
  auth: AuthService;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth = this.authService;
  }

  // Informe l'utilisateur sur son authentfication.
  setMessage() {
    this.message = this.auth.isLoggedIn ?
      'Vous êtes connecté.' : 'Identifiant ou mot de passe incorrect.';
  }

  // Connecte l'utilisateur auprès du Guard
  login() {
    this.message = 'Tentative de connexion en cours ...';
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if (isLoggedIn) {
          this.router.navigate(['/pokemons'])

        } else {
          this.password = '';
          this.router.navigate(['/login'])
        }
      });
  }

  // Déconnecte l'utilisateur
  logout() {
    this.auth.logout();
    this.message = 'Vous etes déconnecté'
  }
}