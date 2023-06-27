import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastrService: Toastr) {}

  public show(msg: string, title: string, type: string): void {
    switch (type) {
      case 'success':
        this.toastrService.success(msg, title);
        break;
      case 'info':
        this.toastrService.info(msg, title);
        break;
      case 'warning':
        this.toastrService.warning(msg, title);
        break;
      case 'error':
        this.toastrService.error(msg, title);
        break;
      default:
        this.toastrService.info(msg, title);
    }
  }
}
