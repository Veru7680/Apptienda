import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonText, 
  IonInput, 
  IonTextarea, 
  IonSelect, 
  IonSelectOption, 
  IonNote, 
  IonButton, 
  IonSpinner,
  AlertController, 
  NavController 
} from '@ionic/angular/standalone';

// ✅ CORREGIR RUTAS DE SERVICIOS
import { ProductoService, Producto } from '../../services/producto.service';
import { CategoriaService, Categoria } from '../../services/categoria.service';

@Component({
  selector: 'app-producto-register',
  templateUrl: './producto-register.page.html',
  styleUrls: ['./producto-register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonText, 
    IonInput, 
    IonTextarea, 
    IonSelect, 
    IonSelectOption, 
    IonNote, 
    IonButton, 
    IonSpinner
  ]
})
export class ProductoRegisterPage implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.productoForm = this.createForm();
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      categoria_id: ['', [Validators.required]]
    });
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => { // ✅ TIPAR EL PARÁMETRO
        this.categorias = data;
      },
      error: (error: any) => { // ✅ TIPAR EL PARÁMETRO
        console.error('Error al cargar categorías:', error);
        this.mostrarError('No se pudieron cargar las categorías');
      }
    });
  }

  async registrarProducto() {
    if (this.productoForm.invalid) {
      this.marcarCamposInvalidos();
      return;
    }

    this.cargando = true;
    const productoData = this.productoForm.value;

    productoData.precio = parseFloat(productoData.precio);
    productoData.categoria_id = parseInt(productoData.categoria_id);

    this.productoService.crearProducto(productoData).subscribe({
      next: (response: any) => {
        this.cargando = false;
        if (response.status === 'success') {
          this.mostrarExito(response.message);
          this.productoForm.reset();
        } else {
          this.mostrarError(response.message || 'Error desconocido');
        }
      },
      error: (error: any) => { // ✅ TIPAR EL PARÁMETRO
        this.cargando = false;
        console.error('Error HTTP:', error);
        this.mostrarError('Error de conexión con el servidor');
      }
    });
  }

  marcarCamposInvalidos() {
    Object.keys(this.productoForm.controls).forEach(key => {
      const control = this.productoForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  async mostrarExito(mensaje: string) {
  const alert = await this.alertController.create({
    header: '✅ Éxito',
    message: mensaje,
    buttons: [
      {
        text: 'Aceptar',
        handler: () => {
          // ✅ VACIAR EL FORMULARIO
          this.productoForm.reset();
        }
      }
    ]
  });
  
  await alert.present();
  
  // ✅ CERRAR AUTOMÁTICAMENTE DESPUÉS DE 2 SEGUNDOS
  setTimeout(() => {
    alert.dismiss();
  }, 2000);
}

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: '❌ Error',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  get nombre() { return this.productoForm.get('nombre'); }
  get descripcion() { return this.productoForm.get('descripcion'); }
  get precio() { return this.productoForm.get('precio'); }
  get categoria_id() { return this.productoForm.get('categoria_id'); }
}