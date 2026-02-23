import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 0.5, // Max 500KB — sufficient for web display, reduces server memory pressure
    maxWidthOrHeight: 1600, // Max dimension 1600px — ideal for property listings
    useWebWorker: true, // Safe on desktop browsers
    initialQuality: 0.7, // Start with 70% JPEG quality for faster compression
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
    if (file.size > 4.5 * 1024 * 1024) {
      throw new Error(`Não foi possível comprimir a imagem ${file.name} e ela é muito grande (${(file.size/1024/1024).toFixed(1)}MB). Limite: 4.5MB.`);
    }
    return file; // Fallback para o arquivo original em caso de erro, desde que pequeno
  }
}

export async function compressImages(files: File[]) {
  const compressed: File[] = [];
  for (const file of files) {
    compressed.push(await compressImage(file));
  }
  return compressed;
}
