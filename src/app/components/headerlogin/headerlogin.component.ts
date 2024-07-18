import { Component, Input } from '@angular/core'
import { NavigationExtras, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-headerlogin',
  templateUrl: 'headerlogin.component.html',
  styleUrls: ['headerlogin.component.css'],
})
export class Headerlogin {
  @Input()
  imageAlt: string = 'image'
  @Input()
  rootClassName: string = ''
  @Input()
  userId: string = ''
  @Input()
  ruta: string = ''
  @Input()
  imageSrc: string = '/assets/logoapp1-200w.jpeg'

  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.logout();

    const navigationExtras: NavigationExtras = {
      replaceUrl: true
    };
    this.router.navigate(['/login'], navigationExtras);
  }
  navigateToRoute() {
    console.log(this.ruta);
    if (this.userId) {
      this.router.navigateByUrl(`${this.ruta}/${this.userId}`);
    } else {
      this.router.navigateByUrl(this.ruta);
    }
  }
}
