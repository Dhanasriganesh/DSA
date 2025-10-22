/**
 * Convert image file to base64 string
 * @param {File} file - The image file to convert
 * @param {function} onProgress - Callback function for progress (optional)
 * @returns {Promise<string>} - The base64 data URL string
 */
export const convertImageToBase64 = async (file, onProgress = null) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP)');
  }

  // Validate file size (max 800KB for Firestore - document limit is 1MB)
  const maxSize = 800 * 1024; // 800KB
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 800KB. Please compress your image first.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadstart = () => {
      if (onProgress) onProgress(0);
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = (e.loaded / e.total) * 100;
        onProgress(progress);
      }
    };

    reader.onload = () => {
      if (onProgress) onProgress(100);
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Get image dimensions from file
 * @param {File} file - The image file
 * @returns {Promise<{width: number, height: number}>}
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

/**
 * Compress and resize image to reduce size for Firestore
 * @param {File} file - The image file
 * @param {number} maxWidth - Maximum width (default: 1200)
 * @param {number} maxHeight - Maximum height (default: 800)
 * @param {number} quality - Image quality (0-1, default: 0.7)
 * @returns {Promise<File>}
 */
export const compressImage = async (file, maxWidth = 1200, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert image to base64 with automatic compression if needed
 * @param {File} file - The image file
 * @param {function} onProgress - Progress callback
 * @returns {Promise<string>} - Base64 data URL
 */
export const processImageForFirestore = async (file, onProgress = null) => {
  try {
    // Check if image needs compression
    const maxSize = 800 * 1024; // 800KB
    
    let processedFile = file;
    
    // Compress if file is too large
    if (file.size > maxSize) {
      if (onProgress) onProgress(25);
      console.log('Compressing image...');
      processedFile = await compressImage(file);
      
      // Check if still too large after compression
      if (processedFile.size > maxSize) {
        // Try with lower quality
        processedFile = await compressImage(file, 1000, 667, 0.5);
      }
    }
    
    if (onProgress) onProgress(50);
    
    // Convert to base64
    const base64 = await convertImageToBase64(processedFile, (progress) => {
      if (onProgress) {
        // Map 0-100 to 50-100
        onProgress(50 + (progress / 2));
      }
    });
    
    return base64;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

export default {
  convertImageToBase64,
  processImageForFirestore,
  getImageDimensions,
  compressImage
};
