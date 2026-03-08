"use client";

import { useState } from "react";

const ImageUploadButton = ({ productId, field, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("productId", productId);
    formData.append("field", field);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      onSuccess?.(data.url);
    } else {
      alert("Upload error");
    }
  };

  return (
    <label style={{ cursor: "pointer" }}>
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => uploadImage(e.target.files[0])}
      />
      <button type="button" disabled={loading}>
        {loading ? "Загрузка..." : "Загрузить изображение"}
      </button>
    </label>
  );
};

export default ImageUploadButton;
