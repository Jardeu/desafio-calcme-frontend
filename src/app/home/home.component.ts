import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AgendaService } from '../services/agenda.service';
import { take } from 'rxjs';
import { Contato } from '../interfaces/contato';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public formContact!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  saveContact() {
    let contato: Contato = {
      name: this.formContact.value.name,
      email: this.formContact.value.email,
      phone: this.removeMask(this.formContact.value.phone)
    };

    this.agendaService.saveContact(contato)
      .pipe(take(1))
      .subscribe({
        next: (response) => this.openSnackBar(response, "OK", "success-snackbar"),
        error: (e) => this.openSnackBar(e.message, "OK", "error-snackbar"),
      });
  }

  removeMask(value: string): string {
    return value.replace(/\D/g, '');
  }

  openSnackBar(message: string, action: string, panelClass: any) {
    this._snackBar.open(message, action, { duration: 2000, panelClass: panelClass });
  }

}
