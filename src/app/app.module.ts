import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { ComponentsModule } from './components/components.module'
import { AppComponent } from './app.component'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from 'src/environments/environment'
import { ReactiveFormsModule } from '@angular/forms'
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'
import { Buscaralumno } from './pages/buscaralumno/buscaralumno.component'
import { AltaalumnoModule } from './pages/altaalumno/altaalumno.module'

const routes = [
  {
    path: 'mensajesrecibidos',
    loadChildren: () =>
      import('./pages/mensajesrecibidos/mensajesrecibidos.module').then(
        (m) => m.MensajesrecibidosModule
      ),
  },
  {
    path: 'mainprofesores',
    loadChildren: () =>
      import('./pages/mainprofesores/mainprofesores.module').then(
        (m) => m.MainprofesoresModule
      ),
  },
  {
    path: 'tablonanuncios',
    loadChildren: () =>
      import('./pages/tablonanuncios/tablonanuncios.module').then(
        (m) => m.TablonanunciosModule
      ),
  },
  {
    path: 'altaalumno',
    loadChildren: () =>
      import('./pages/altaalumno/altaalumno.module').then(
        (m) => m.AltaalumnoModule
      ),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilModule),
  },
  {
    path: 'presentacion',
    loadChildren: () =>
      import('./pages/presentacion/presentacion.module').then(
        (m) => m.PresentacionModule
      ),
  },
  {
    path: 'incidencias',
    loadChildren: () =>
      import('./pages/incidencias/incidencias.module').then(
        (m) => m.IncidenciasModule
      ),
  },
  {
    path: 'confighorario',
    loadChildren: () =>
      import('./pages/confighorario/confighorario.module').then(
        (m) => m.ConfighorarioModule
      ),
  },
  {
    path: 'mensajesenviados',
    loadChildren: () =>
      import('./pages/mensajesenviados/mensajesenviados.module').then(
        (m) => m.MensajesenviadosModule
      ),
  },
  {
    path: 'prueba',
    loadChildren: () =>
      import('./pages/prueba/prueba.module').then((m) => m.PruebaModule),
  },
  {
    path: 'mainadmin',
    loadChildren: () =>
      import('./pages/mainadmin/mainadmin.module').then(
        (m) => m.MainadminModule
      ),
  },
  {
    path: 'altaempleado',
    loadChildren: () =>
      import('./pages/altaempleado/altaempleado.module').then(
        (m) => m.AltaempleadoModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'mainconserjeria',
    loadChildren: () =>
      import('./pages/mainconserjeria/mainconserjeria.module').then(
        (m) => m.MainconserjeriaModule
      ),
  },
  {
    path: 'recordatorios',
    loadChildren: () =>
      import('./pages/recordatorios/recordatorios.module').then(
        (m) => m.RecordatoriosModule
      ),
  },
  {
    path: 'mainpadres',
    loadChildren: () =>
      import('./pages/mainpadres/mainpadres.module').then(
        (m) => m.MainpadresModule
      ),
  },
  {
    path: 'nuevochat',
    loadChildren: () =>
      import('./pages/nuevochat/nuevochat.module').then(
        (m) => m.NuevochatModule
      ),
  },
  {
    path: 'horario',
    loadChildren: () =>
      import('./pages/horario/horario.module').then((m) => m.HorarioModule),
  },
  {
    path: 'plantillahorario',
    loadChildren: () =>
      import('./pages/plantillahorario/plantillahorario.module').then(
        (m) => m.PlantillahorarioModule
      ),
  },
  {
    path: 'nuevomensaje',
    loadChildren: () =>
      import('./pages/nuevomensaje/nuevomensaje.module').then(
        (m) => m.NuevomensajeModule
      ),
  },
  {
    path: 'mainjefatura',
    loadChildren: () =>
      import('./pages/mainjefatura/mainjefatura.module').then(
        (m) => m.MainjefaturaModule
      ),
  },
  {
    path: 'nuevorecordatorio',
    loadChildren: () =>
      import('./pages/nuevorecordatorio/nuevorecordatorio.module').then(
        (m) => m.NuevorecordatorioModule
      ),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'page',
    loadChildren: () =>
      import('./pages/page/page.module').then((m) => m.PageModule),
  },
  {
    path: 'editarboletn',
    loadChildren: () =>
      import('./pages/editarboletn/editarboletn.module').then(
        (m) => m.EditarboletnModule
      ),
  },
  {
    path: 'buscarpersonal',
    loadChildren: () =>
      import('./pages/buscarpersonal/buscarpersonal.module').then(
        (m) => m.BuscarpersonalModule
      ),
  },
  {
    path: 'buscaralumno',
    loadChildren: () =>
      import('./pages/buscaralumno/buscaralumno.module').then(
        (m) => m.BuscaralumnoModule
      ),
  },
  {
    path: 'mainalumno',
    loadChildren: () =>
      import('./pages/mainalumno/mainalumno.module').then(
        (m) => m.MainalumnoModule
      ),
  },
  {
    path: 'boletines',
    loadChildren: () =>
      import('./pages/boletines/boletines.module').then(
        (m) => m.BoletinesModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
]

/* @NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ComponentsModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
}) */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ComponentsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
   ],
  providers: [
    // {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppModule {}
