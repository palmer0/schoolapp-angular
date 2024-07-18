export interface Incidencia {
    id?: string,
    userId: string,
    profesorNombre: string,
    asignatura: string,
    contenido: string,
    justificacion?: string,
    mostrarJustificacion?: boolean
}
