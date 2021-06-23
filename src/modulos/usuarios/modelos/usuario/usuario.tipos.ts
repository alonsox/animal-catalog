import { Document, Model } from 'mongoose';

export interface Usuario {
  nombre: string;
  apellido: string;
  username: string;
  correo: string;
  contraseña: string;
  esAdmin: boolean;
  estaActivo: boolean;
  codigoConfirmacion: string;
}

export interface UsuarioDocument extends Usuario, Document {}

export interface UsuarioMongooseModel extends Model<UsuarioDocument> {
  /**
   * Busca un usuario por email o por username.
   *
   * @returns Una query para ejecutar la búsqueda
   */
  buscarPorLoginField(this: Model<UsuarioDocument>, loginField: string): any;
}
