const { packager } = require('@electron/packager');
const path = require('path');
const fs = require('fs');

async function buildExe() {
  console.log('🚀 Iniciando empaquetado del ejecutable (.exe)...');

  // Verificar que la compilación de Next.js exista
  const outDir = path.join(__dirname, '..', 'out');
  if (!fs.existsSync(outDir)) {
    console.error('❌ La carpeta "out" no existe. Ejecuta "npm run build" primero.');
    process.exit(1);
  }

  // Carpeta temporal de la app para empaquetar de forma ultra limpia y rápida
  const stagingDir = path.join(__dirname, '..', '.staging-app');
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
  fs.mkdirSync(stagingDir, { recursive: true });

  // Copiar package.json mínimo
  const minimalPackage = {
    name: 'prototipo-dsi-smartcart',
    version: '1.0.0',
    main: 'electron/main.js',
  };
  fs.writeFileSync(
    path.join(stagingDir, 'package.json'),
    JSON.stringify(minimalPackage, null, 2)
  );

  // Copiar electron/main.js
  const stagingElectronDir = path.join(stagingDir, 'electron');
  fs.mkdirSync(stagingElectronDir, { recursive: true });
  fs.copyFileSync(
    path.join(__dirname, '..', 'electron', 'main.js'),
    path.join(stagingElectronDir, 'main.js')
  );

  // Copiar carpeta out
  const stagingOutDir = path.join(stagingDir, 'out');
  fs.cpSync(outDir, stagingOutDir, { recursive: true });

  console.log('📦 Empaquetando con Electron Packager para Windows x64...');

  const appPaths = await packager({
    dir: stagingDir,
    out: path.join(__dirname, '..', 'dist'),
    name: 'Prototipo-Carrito-Inteligente',
    platform: 'win32',
    arch: 'x64',
    overwrite: true,
    asar: false,
    prune: true,
  });

  // Limpiar carpeta temporal
  fs.rmSync(stagingDir, { recursive: true, force: true });

  console.log('✅ ¡Ejecutable generado con éxito!');
  console.log('📂 Ubicación:', appPaths[0]);
  console.log('⚡ Archivo ejecutable: Prototipo-Carrito-Inteligente.exe');
}

buildExe().catch((err) => {
  console.error('❌ Error empaquetando ejecutable:', err);
  process.exit(1);
});
