import { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import toast from 'react-hot-toast';
import * as S from './styles';
import Image from 'next/image';

const ImageSorter = ({ initialImages, code, setImages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Инициализация SortableJS
    const sortable = new Sortable(containerRef.current, {
      animation: 150,
      ghostClass: 'opacity-40',
      // Критично: запрещаем тащить карточку, если кликнули на кнопку удаления
      filter: '.deleteButton', 
      
      onEnd: async () => {
        const updatedImages = sortable.toArray(); 

        try {
          const response = await fetch(`/api/product/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              images: updatedImages,
              code
            }),
          });

          if (!response.ok) throw new Error("Server error");

          const data = await response.json();
          
          if (data && data.images) {
            setImages(data.images);
            toast.success("Порядок успішно збережено");
          }
        } catch (error) {
          console.error(error);
          toast.error("Виникла помилка при зміні порядку");
        }
      },
    });

    return () => sortable.destroy();
  }, [code, setImages]);

  // Функция для удаления конкретного изображения
  const handleDelete = async (imgToDelete) => {
  // Опционально: подтверждение перед удалением
  if (!confirm("Ви впевнені, що хочете видалити це фото?")) return;

  // 1. Формируем новый массив без удаляемой картинки
  const updatedImages = initialImages.filter((img) => img !== imgToDelete);

  try {
    // Вспомогательная функция для вытаскивания public_id из URL Cloudinary
    // Находит сегмент /upload/ и берет всё, что после него и версии (если она есть), отсекая расширение
    const getPublicIdFromUrl = (url) => {
      const parts = url.split('/upload/');
      if (parts.length < 2) return null;
      
      // Убираем версию (например, v17234567/) если она присутствует
      let pathAfterUpload = parts[1];
      if (pathAfterUpload.startsWith('v')) {
        pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
      }
      
      // Отсекаем расширение файла (.jpg, .webp и т.д.)
      return pathAfterUpload.replace(/\.[^/.]+$/, "");
    };

    const publicId = getPublicIdFromUrl(imgToDelete);

    if (publicId) {
      // 2. Сначала удаляем физический файл из Cloudinary через ваш DELETE-эндпоинт
      const params = new URLSearchParams({ publicId, code: String(code) });
      const cloudDeleteResponse = await fetch(`/api/cloudinary?${params}`, {
        method: "DELETE",
      });

      if (!cloudDeleteResponse.ok) {
        const errorData = await cloudDeleteResponse.json().catch(() => null);
        throw new Error(errorData?.error || "Не удалось удалить файл из Cloudinary");
      }
    }
  } catch (e) {
    console.error("Ошибка при удалении из Cloudinary:", e);
    // Не прерываем процесс, чтобы база данных всё равно синхронизировалась
  }
  
  try {
    // 3. Отправляем обновленный массив на бэкенд (роут перезапишет его целиком)
    const response = await fetch(`/api/product/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: updatedImages,
        code
      }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();

    if (data && data.images) {
      // 4. Обновляем локальное состояние в React
      setImages(data.images);
      toast.success("Фото успішно видалено");
    }
  } catch (error) {
    console.error(error);
    toast.error("Помилка при видаленні фото");
  }
};


  return (
    <S.ImagesList ref={containerRef}>
      {initialImages.map((img) => (
        <div
          key={img}
          data-id={img}
          className="imageCard"
        >  
          <Image 
            src={img} 
            fill 
            alt="Товар" 
            style={{ pointerEvents: 'none' }} 
            unoptimized 
          />
          
          {/* Кнопка удаления поверх картинки */}
          <button
            type="button"
            className="deleteButton"
            onClick={() => handleDelete(img)}
            title="Видалити фото"
          >
            ×
          </button>
        </div>
      ))}
    </S.ImagesList>
  );
}

export default ImageSorter;

