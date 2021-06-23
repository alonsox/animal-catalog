import nodemailer from 'nodemailer';
import { cargarPlantillaCorreo } from './cargar-plantilla-correo';
import { configuracionCorreo } from './correo.config';

interface DatosCorreo {
  /** El correo del destinatario */
  destinatario: string;

  /**  */
  titulo: string;

  /** Los contenidos del correo (puede ser html) */
  cuerpo: string;
}

/**
 * Envia un correo.
 */
export async function enviarCorreo(infoCorreo: DatosCorreo): Promise<void> {
  /* Configura la conexión SMTP */
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: configuracionCorreo.correoApp,
      pass: configuracionCorreo.contraseñaCorreoApp,
    },
  });

  /* Send the email */
  await transport.sendMail({
    from: configuracionCorreo.correoApp,
    to: infoCorreo.destinatario,
    subject: infoCorreo.titulo,
    html: infoCorreo.cuerpo,
  });
}

/**
 * Envia un correo completando una plantilla.
 */
export async function enviarCorreoConPlantilla<T>(
  infoCorreo: DatosCorreo,
  plantilla: string,
  data: T,
): Promise<void> {
  const cuerpoCorreo = await cargarPlantillaCorreo(plantilla, data);

  return enviarCorreo({
    ...infoCorreo,
    cuerpo: cuerpoCorreo,
  });
}
