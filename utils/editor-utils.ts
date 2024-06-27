function onImageUpload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.match("image.*")) {
      reject("Unsupported file type.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result.toString());
      } else {
        reject("Failed to load image.");
      }
    };
    reader.onerror = () => {
      reject("Error reading file.");
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
}

function editImage(
  dataUrl: string,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;

      let canvasWidth = img.width;
      let canvasHeight = img.height;

      // Resizing logic to maintain aspect ratio
      if (canvasWidth > maxWidth) {
        canvasWidth = maxWidth;
        canvasHeight = maxWidth / aspectRatio;
      }

      if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * aspectRatio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvasWidth, canvasHeight);

      try {
        const editedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(editedDataUrl);
      } catch (error) {
        reject("Failed to edit image.");
      }
    };
    img.onerror = () => {
      reject("Error loading image.");
    };

    img.src = dataUrl;
  });
}

export { onImageUpload, editImage };
