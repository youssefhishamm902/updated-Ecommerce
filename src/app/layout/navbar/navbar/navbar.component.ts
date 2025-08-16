import { Component, Inject, input, Input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { FlowbiteService } from '../../../core/services/flowbite'; // Ensure the correct file and exported member
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink, RouterLinkActive] // Fixed property name
})
export class NavbarComponent implements OnInit {
  constructor(@Inject(FlowbiteService) private flowbiteService: FlowbiteService, private authService : AuthService) {}

  // @Input() isLoggedIn: boolean = true;

  isLoggedIn = input<boolean>(true);  // better performance and reactivity

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite(); // Initialize Flowbite components
    });
  }

  signOut() {
    this.authService.signOut();
  }
}