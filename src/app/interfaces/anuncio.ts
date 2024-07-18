export interface Anuncio {
    id: string;
    nombre: string;
    contenido: string;
    transmisor: string;
    curso_id?: string; 
    grupo_id?: string; 
    destinatarios: string[];
}
