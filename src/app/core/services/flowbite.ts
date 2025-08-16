import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  loadFlowbite(callback: () => void): void {
    // Simulate loading Flowbite (if needed, add actual logic here)
    callback();
  }
}
