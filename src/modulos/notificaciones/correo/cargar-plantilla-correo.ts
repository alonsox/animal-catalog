import ejs from 'ejs';
import path from 'path';

/**
 * Carga la plantilla de un correo y la completa con los datos necesarios.
 */
export function cargarPlantillaCorreo<T>(
  plantilla: string,
  datosPlantilla: T,
): Promise<string> {
  const nombrePlantilla = `plantillas/${plantilla}.ejs`;

  return ejs.renderFile(
    path.join(__dirname, nombrePlantilla),
    datosPlantilla,
    {},
  );
}
