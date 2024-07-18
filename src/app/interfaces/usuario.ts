import { DocumentData } from "@angular/fire/compat/firestore";
import { DocumentReference } from "@angular/fire/firestore";

export interface Usuario {
    id: string;
    nombre: string;
    dni: string;
    tlf: string;
    email: string;
    fecha_nacimiento_usuario: string;
    direccion: string;
    cpostal: string;
    municipio_id: string; 
    repetidor_usuario?: boolean; 
    recogida_usuario?: boolean; 
    curso?: string; 
    rol; 
    recordatorio_id: number; 
    anuncio_id: string[]; 
    nombre_padre?: string; 
    dni_padre?: string; 
    email_padre?: string;
    contrasena_padre?: string; 
    horarios_id: string[]; 
    ult_curso_trabajado?: string; 
    ult_centro_trabajo?: string;
    municipio_trabajado_id: string; 
    departamento?: string;
    grupo?: string; 
    asignatura_id?: string[];
    hijos?: string[];
    boletines?: string[];
    cursosAsingnados?: any[];
    foto?: string;
}
