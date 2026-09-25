import { useRef } from "react";
import toast from "react-hot-toast";
import ImageWrapper from "@/components/Product/ImageWrapper";

function ImageUploader({ onUpload, code, onSuccess }) {
  const inputRef = useRef();

const uploadFiles = async (files) => {
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("code", code);

    const res = await fetch("/api/cloudinary", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  });

  const urls = await Promise.all(uploadPromises);
  onUpload(urls);
  toast.success('успішно додана фотографії');
  if (onSuccess && typeof onSuccess === 'function'){
    onSuccess()
  }
};


  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
      >
        Выбрать фотографии
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(e) => uploadFiles(e.target.files)}
      />
    </>
  );
}

export default ImageUploader