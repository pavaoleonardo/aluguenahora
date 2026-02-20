import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1, // Max size 1MB
    maxWidthOrHeight: 1920, // Max dimension 1920px
    useWebWorker: true,
  };
  
  try {
    const compressedFile = await imageCompression(file, options);
    // Preservar o nome original
    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('Erro na compressão:', error);
    return file; // Fallback para o arquivo original em caso de erro
  }
}

export async function compressImages(files: File[]) {
  const compressed: File[] = [];
  for (const file of files) {
    compressed.push(await compressImage(file));
  }
  return compressed;
}
