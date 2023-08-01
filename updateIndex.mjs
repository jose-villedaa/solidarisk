import fs from 'fs';
import path from 'path';

const folderPath = './dist/assets'; // Ruta del directorio donde se encuentran los archivos generados
const filenamePattern = /^index-[a-f0-9]+\.js$/; // Expresión regular para buscar el archivo index.js generado (cambia según tu caso)

const searchString = 'o.on(sl.Draw.Event.CREATED,i)';
const replaceString = 'o.on(\'draw:created\', i)';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio:', err);
    return;
  }

  // Busca el archivo que coincida con el patrón filenamePattern
  const targetFile = files.find((file) => filenamePattern.test(file));

  if (!targetFile) {
    console.error('No se encontró el archivo index.js en el directorio.');
    return;
  }

  const filePath = path.join(folderPath, targetFile);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo index.js:', err);
      return;
    }

    const updatedData = data.replace(searchString, replaceString);

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo index.js:', err);
        return;
      }

      console.log('Archivo index.js modificado exitosamente.');
    });
  });
});
