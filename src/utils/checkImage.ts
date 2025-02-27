export const validateImage = (file: File, type: string): boolean => {
  if (type === "image") {
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    return file && validImageTypes.indexOf(file.type) > -1;
  } else {
    const validVideoTypes = [
      "video/m4v",
      "video/avi",
      "video/mpg",
      "video/mp4",
      "video/webm",
    ];
    return file && validVideoTypes.indexOf(file.type) > -1;
  }
};

export const checkImage = (file: File, type: string): boolean => {
  let isValid = true;
  if (!validateImage(file, type)) {
    window.alert(`File ${file.name} not accepted`);
    isValid = false;
    return false;
  }
  if (checkImageSize(file, type)) {
    window.alert(checkImageSize(file, type));
    isValid = false;
    return false;
  }
  return isValid;
};

export const readAsBase64 = (
  file: File
): Promise<string | ArrayBuffer> => {
  const reader: FileReader = new FileReader();
  const fileValue: Promise<string | ArrayBuffer | null> = new Promise(
    (resolve, reject) => {
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      reader.addEventListener("error", (event: ProgressEvent<FileReader>) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    }
  );
  return fileValue;
};

export const checkImageSize = (file: File, type: string): string => {
  let fileError = "";
  const isValid = validateImage(file, type);
  if (!isValid) {
    fileError = `File ${file.name} not accepted`;
  }
  if (file.size > 50000000) {
    // 50 MB
    fileError = "File is too large.";
  }
  return fileError;
};
