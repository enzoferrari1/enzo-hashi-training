export async function convertImagesToBase64(
  imageUrls: string[]
): Promise<string[]> {
  const convertImage = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image:", url, error);
      return ""; // Return empty string if conversion fails
    }
  };

  return Promise.all(imageUrls.map(convertImage));
}
