export interface Asignatura {
    id_asignatura: number;
    nombre: string;
    curso_id: number; // ID del curso en Firestore
    id_usuario: string[]; // Arreglo de objetos Usuario
}
