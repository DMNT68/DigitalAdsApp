export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public telefono?: string,
        public img?: string,
        public role?: string,
        public google?: string,
        public estado?: boolean,
        public _id?: string
    ){

    }
}