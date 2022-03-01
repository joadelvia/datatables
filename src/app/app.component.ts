import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datatable';
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      language: {
        //Podemos utilizar el cdn o descargar el fichero y trabajar en local
        // url: 'http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
        url: '/assets/es-ES.json'
      }
    };
  }
}
