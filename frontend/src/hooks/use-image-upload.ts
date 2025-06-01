import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages((prev) => [...prev, ...files]);
    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) added to your problem description`,
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const convertFirstImageToBase64 = async (): Promise<string | null> => {
    if (uploadedImages.length === 0) return null;

    const file = uploadedImages[0];
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix
        resolve(base64String.split(",")[1]);
      };
      reader.readAsDataURL(file);
    });
  };

  const clearImages = () => {
    setUploadedImages([]);
  };

  return {
    uploadedImages,
    handleImageUpload,
    removeImage,
    convertFirstImageToBase64,
    clearImages,
  } as const;
};
