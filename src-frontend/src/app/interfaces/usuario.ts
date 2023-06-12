export interface Usuario {
    _id: string,
    nombreApellidos: string,
    email: string,
    password: string,
    fechaNacimiento: Date,
    localidad: string,
    role: string
}