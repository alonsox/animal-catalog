import { model, Model, Schema } from 'mongoose';
import { configuracionUsuarios } from '../../usuarios.config';
import { UsuarioDocument, UsuarioMongooseModel } from './usuario.tipos';

const userSchema = new Schema<UsuarioDocument, UsuarioMongooseModel>({
  nombre: { type: String },
  apellido: { type: String },
  username: { type: String },
  password: { type: String },
  correo: { type: String },
  contraseña: { type: String },
  esAdmin: { type: Boolean },
  estaActivo: { type: Boolean },
  codigoConfirmacion: { type: String },
  expiraDespuesDe: {
    type: Date,
    default: Date.now,
    expires: configuracionUsuarios.tiempoExpiracionNuevaCuenta,
  },
});

userSchema.statics.buscarPorLoginField = function searchByLoginField(
  this: Model<UsuarioDocument>,
  loginField: string,
) {
  return this.findOne({
    $or: [{ correo: loginField }, { username: loginField }],
  });
};

export const UsuarioModel = model<UsuarioDocument, UsuarioMongooseModel>(
  'UsuarioModel',
  userSchema,
  'usuarios',
);
