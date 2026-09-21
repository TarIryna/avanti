"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation'; // Добавили хук для получения [shop]
import * as S from './styles';
import toast from 'react-hot-toast';
import HeadButtons from './HeadButtons';

const AuditPage = () => {
  const params = useParams();
  const shopId = params?.shop ? Number(params.shop) : null; // Извлекаем номер магазина из URL

  const [barcode, setBarcode] = useState("");
  const [scannedItems, setScannedItems] = useState({});
  const [dbBarcodes, setDbBarcodes] = useState([]); 
  const [errorLog, setErrorLog] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [place, setPlace] = useState("");

  const barcodeInputRef = useRef(null); // Ссылка для управления фокусом

  // 1. При загрузке страницы скачиваем список валидных штрихкодов
  useEffect(() => {
    const fetchBarcodes = async () => {
      try {
        const res = await fetch('/api/products/barcodes');
        const data = await res.json();
        setDbBarcodes(data); 
      } catch (err) {
        console.error("Не удалось загрузить базу штрихкодов", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarcodes();

    // Восстанавливаем сохраненную ревизию и полку
    const savedItems = localStorage.getItem("current_audit_items");
    const savedPlace = localStorage.getItem("current_audit_place");
    if (savedItems) setScannedItems(JSON.parse(savedItems));
    if (savedPlace) setPlace(savedPlace);
  }, []);

  // Синхронизируем ввод полки с LocalStorage
  const handlePlaceChange = (e) => {
    const val = e.target.value;
    setPlace(val);
    localStorage.setItem("current_audit_place", val);
  };

  // Оптимизируем массив для мгновенного поиска через useMemo
  const barcodesSet = useMemo(() => new Set(dbBarcodes), [dbBarcodes]);

  // 2. Обработка сканирования
  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    const currentBarcode = barcode.trim();
    if (!currentBarcode) return;

    // Валидация: заполнена ли полка перед сканированием товара?
    if (!place.trim()) {
      alert("Будь ласка, спочатку вкажіть номер полиці!");
      return;
    }

    // КРИТИЧЕСКАЯ ПРОВЕРКА: есть ли штрихкод в скачанной базе?
    if (!barcodesSet.has(currentBarcode)) {
      setErrorLog(prev => [`[${new Date().toLocaleTimeString()}] Невідомий штрихкод: ${currentBarcode}`, ...prev]);
      
      if (typeof window !== "undefined") {
      new Audio("https://google.com").play().catch(() => {});
    }

      setBarcode("");
      return; 
    }

    // Если код валидный — добавляем в список ревизии
    setScannedItems(prev => {
      const updated = { ...prev, [currentBarcode]: (prev[currentBarcode] || 0) + 1 };
      localStorage.setItem("current_audit_items", JSON.stringify(updated));
      return updated;
    });

    setBarcode("");
  };

  // 3. Отправка полки в базу данных
  const handleSendToDatabase = async () => {
    if (!place.trim()) return alert("Укажіть номер полиці!");
    if (Object.keys(scannedItems).length === 0) return alert("Список відсканованих товарів порожній!");
    if (!shopId) return alert("Не вдалося визначити номер магазину з URL!");

    setIsSending(true);
    try {
      const res = await fetch('/api/shop/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop: shopId,
          place: place.trim(),
          items: scannedItems // Объект вида { "штрихкод": количество }
        })
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(`Полицю ${place} успішно збережено в базі!`);
        // Очищаем стейт и локальное хранилище для СЛЕДУЮЩЕЙ полки
        setScannedItems({});
        setPlace("");
        localStorage.removeItem("current_audit_items");
        localStorage.removeItem("current_audit_place");
      } else {
        toast.error(`Помилка: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Сталася помилка при відправці даних");
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return <div>Завантаження бази штрихкодів для верифікації...</div>;

  return (
    <section className="container page">
      <S.Title>РЕВІЗІЯ — АВАНТІ {shopId}</S.Title>
      <HeadButtons/>
      <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
        
        {/* Левая колонка — сканирование */}
        <div style={{ flex: 1 }}>
          <h3>Сканування ревізії</h3>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 1, gap: '10px' }}>
              <label style={{ fontSize: '14px', color: '#666' }}>Номер полиці: </label>
              <S.Input
                type="text" 
                value={place} 
                onChange={handlePlaceChange} 
                placeholder="Наприклад: Поличка А1"
                disabled={Object.keys(scannedItems).length > 0} // Блокируем смену полки, пока список не отправлен
              />
            </div>
          </div>

          <S.Form onSubmit={handleBarcodeSubmit}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '14px', color: '#666' }}>Сканування штрихкоду товара:</label>
              <S.Input
                ref={barcodeInputRef}
                type="text" 
                value={barcode} 
                onChange={(e) => setBarcode(e.target.value)} 
                placeholder="Скануйте сюди..."
                autoFocus 
              />
            </div>
          </S.Form>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Відскановано унікальних позицій: {Object.keys(scannedItems).length}</h4>
            <button 
              type="button" 
              onClick={handleSendToDatabase}
              disabled={isSending}
              style={{ padding: '10px 20px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {isSending ? "Збереження..." : "Зафіксувати полицю в БД"}
            </button>
          </div>

          <ul style={{ marginTop: '15px', maxHeight: '300px', overflowY: 'auto' }}>
            {Object.entries(scannedItems).map(([code, qty]) => (
              <li key={code} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                Штрихкод: <code>{code}</code> — <b>{qty} шт.</b>
              </li>
            ))}
          </ul>
        </div>

        {/* Правая колонка — Журнал Ошибок */}
        <div style={{ width: '350px', background: '#fff5f5', padding: '15px', borderRadius: '8px', alignSelf: 'flex-start' }}>
          <h3 style={{ color: '#e53e3e' }}>⚠️ Помилки сканування ({errorLog.length})</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto', fontSize: '14px', color: '#c53030' }}>
            {errorLog.length === 0 ? "Помилок поки нема" : errorLog.map((err, idx) => (
              <div key={idx} style={{ marginBottom: '8px', borderBottom: '1px dashed #feb2b2', paddingBottom: '4px' }}>{err}</div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AuditPage;
