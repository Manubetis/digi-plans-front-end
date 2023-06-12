export interface Evento{
    _id: string,
    titulo: string,
    categoria: string,
    fecha: Date,
    localidad: string,
    datos_de_interes?: string,
    creador: string
}