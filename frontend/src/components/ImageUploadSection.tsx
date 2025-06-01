import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImageUploadSectionProps {
  uploadedImages: File[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUploadSection = ({
  uploadedImages,
  onImageUpload,
  onRemoveImage,
}: ImageUploadSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Upload className="w-4 h-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">Add Images</span>
      </div>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="text-center">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">
              Click to upload images or drag and drop
            </p>
            <p className="text-xs text-slate-500">
              PNG, JPG, GIF up to 10MB each
            </p>
          </div>
        </label>
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {uploadedImages.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg border"
              />
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <p className="text-xs text-slate-500 mt-1 truncate">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
