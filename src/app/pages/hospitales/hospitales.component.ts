import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor( public hospitalService: HospitalService,
               public modalUploadService: ModalUploadService ) { }

  ngOnInit() {

    this.cargarHospitales();
    this.modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() );

  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales );
  }

  buscarHospital( termino: string) {

    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.hospitalService.buscarHospital( termino )
            .subscribe( hospitales => this.hospitales = hospitales );
  }

  guardarHospital( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital )
        .subscribe();

  }

  borrarHospital( hospital: Hospital ) {

    this.hospitalService.borrarHospital( hospital._id )
          .subscribe( () => this.cargarHospitales());

  }

  crearHospital() {


    Swal.fire({
      title: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then( ( valor ) => {

      if ( !valor || valor === null ) {
        return;
      }

      this.hospitalService.crearHsopital( valor.value )
          .subscribe( () => this.cargarHospitales() );
    });

  }

  actualizarImagen( hospital: Hospital) {

    this.modalUploadService.mostratModal( 'hospitales', hospital._id );

  }

}
