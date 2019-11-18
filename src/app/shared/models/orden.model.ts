import { Usuario } from './usuario.model';
import { Detalle } from './ordenDetalle.model';
export interface OrdenClass {
    total?:         number;
    atendido?:      boolean;
    estado?:        boolean;
    _id?:           string;
    usuario?:       Usuario;
    fechaCreacion?: Date;
}

export interface Orden {
    orden:    OrdenClass;
    detalles: Detalle[];
}