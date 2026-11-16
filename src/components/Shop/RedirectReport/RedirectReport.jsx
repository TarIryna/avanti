'use client';
import * as S from './styles'
import HeadButtons from '../HeadButtons'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { getVendor } from '@/data/getData';
import { seasonData } from '@/data/seasons';
import { getKyivDateKey, groupRedirectReportRows } from '@/helpers/redirectReport';

const RedirectReportPage = () => {
    const { shop } = useParams();
    const router = useRouter();
    const [from, setFrom] = useState(() => getKyivDateKey());
    const [to, setTo] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const controller = useRef(null);
    const resetReport = useCallback(() => {
        controller.current?.abort();
        setReport(null);
        setError('');
        setLoading(false);
        setPage(1);
    }, []);
    useEffect(() => {
        resetReport();
        return () => controller.current?.abort();
    }, [shop, resetReport]);

    const changeShop = (event) => {
        const nextShop = event.target.value;
        if (nextShop === String(shop)) return;
        resetReport();
        router.push(`/shop/${nextShop}/redirect-report`, { scroll: false });
    };

    const loadReport = async (mode) => {
        controller.current?.abort();
        const request = new AbortController();
        controller.current = request;
        setLoading(true);
        setError('');
        setReport(null);
        try {
            const params = new URLSearchParams({ mode, shop: String(shop) });
            if (mode === 'operations') {
                params.set('from', from);
                if (to) params.set('to', to);
            }
            const response = await fetch(`/api/shop/redirect-report?${params}`, {
                cache: 'no-store', signal: request.signal,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Помилка завантаження звіту');
            if (!request.signal.aborted) {
                setReport(data);
                setPage(1);
            }
        } catch (error) {
            if (!request.signal.aborted) setError(error.message);
        } finally {
            if (!request.signal.aborted) setLoading(false);
        }
    };
    const formatDate = value => new Date(value).toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
    const groupedRows = useMemo(() => groupRedirectReportRows(report?.rows || []), [report]);
    const pages = Math.ceil(groupedRows.length / 50);
    const rows = groupedRows.slice((page - 1) * 50, page * 50);

    return(
       <section className="container page">
        <S.Title>ЗВІТ ДЛЯ ПЕРЕМІЩЕННЯ МІЖ МАГАЗИНАМИ</S.Title>
        <HeadButtons shop={shop}/>
        <S.Panel>
            {String(shop) === '1' && <p><strong>Для А1 показуємо переміщення з А1 до А2: в А1 доступно більше однієї пари, в А2 — жодної, на складі А3 немає доступної пари.</strong></p>}
            {String(shop) === '2' && <p><strong>Для А2 показуємо лише рекомендації на переміщення з А2.</strong></p>}
            {String(shop) === '3' && <p><strong>Для складу А3 показуємо лише рекомендації на переміщення зі складу А3.</strong></p>}
            <p>А1 — пріоритетний магазин. Пропонуємо по 1 парі відсутнього розміру: спочатку зі складу А3, а для А1 — з А2, якщо на складі немає доступної пари. Брак не враховується. Якщо на складі лише одна пара, пріоритет має А1.</p>
            <p>Звіт показує поточні залишки та рекомендації. Для переміщення потрібно окремо оформити списання і прихід.</p>
            <S.Controls>
                <label>Магазин
                    <select value={String(shop)} onChange={changeShop}>
                        <option value="1">А1</option>
                        <option value="2">А2</option>
                        <option value="3">Склад А3</option>
                    </select>
                </label>
                <label>Дата від
                    <input type="date" value={from} max={to || getKyivDateKey()} onChange={event => setFrom(event.target.value)} />
                </label>
                <label>Дата до (необов’язково)
                    <input type="date" value={to} min={from} max={getKyivDateKey()} onChange={event => setTo(event.target.value)} />
                </label>
                <Button type="button" disabled={loading || !from || (!!to && to < from)} onClick={() => loadReport('operations')}>За операціями</Button>
                <Button type="button" disabled={loading} onClick={() => loadReport('stock')}>Усі сезонні залишки</Button>
            </S.Controls>
            <p>За операціями: розміри з продажів, списань і передач у доставку А1/А2 за вибраний період. Без кінцевої дати — до поточного моменту. Кінцева дата включається повністю; час — київський.</p>
        </S.Panel>
        <div aria-live="polite">
            {loading && <S.Message>Формуємо звіт…</S.Message>}
            {error && <S.Message role="alert">{error}</S.Message>}
            {report && <>
                <S.Message>
                    <strong>{report.mode === 'operations' ? 'За операціями' : 'Усі сезонні залишки'}</strong>
                    {report.mode === 'operations'
                        ? <span>Період: {formatDate(report.from)} — {formatDate(report.to)}</span>
                        : <span>Сезони: {report.seasons.map(id => seasonData.find(item => item.id === id)?.ukr || id).join(', ')}</span>}
                    <span>Станом на {formatDate(report.generatedAt)}. Товарів: {groupedRows.length}. Розмірів: {report.rows.length}. До переміщення: {report.totalPairs} пар.</span>
                </S.Message>
                {!report.rows.length ? <S.Message>Варіантів для переміщення не знайдено.</S.Message> : <>
                    <S.TableWrapper>
                        <S.Table>
                            <thead><tr><th>Товар та залишки</th><th>Розмір</th><th>А1</th><th>А2</th><th>Склад А3</th></tr></thead>
                            <tbody>{rows.map(row => <tr key={row.code}>
                                <td><S.Product>
                                    {row.image && <Image src={row.image} width={55} height={55} alt={`Товар ${row.code}`} unoptimized />}
                                    <S.ProductInfo><strong>{row.code}</strong><div>{getVendor(row.vendor)} {row.model}</div></S.ProductInfo>
                                    <S.StockOverview>
                                    {row.allSizes.filter(stock => stock.shop !== 3 || stock.sizes.some(item => item.q > 0)).map(stock => <S.StockRow key={stock.shop}>
                                        <strong>А{stock.shop}</strong>
                                        <S.SizeList>{stock.sizes.map(item => <S.SizeBadge
                                            key={item.size}
                                            highlighted={row.recommendations.some(recommendation => recommendation.size === item.size)}
                                            empty={item.q === 0}
                                            title={`Розмір ${item.size}: всього ${item.q}, брак ${item.isDefect}, доступно ${item.available}`}
                                            aria-label={`Розмір ${item.size}: всього ${item.q}, брак ${item.isDefect}, доступно ${item.available}`}
                                        >
                                            <span>{item.size}</span>
                                            <small>{item.q}{item.isDefect > 0 && <S.DefectMark> · б{item.isDefect}</S.DefectMark>}</small>
                                        </S.SizeBadge>)}</S.SizeList>
                                    </S.StockRow>)}
                                    </S.StockOverview>
                                </S.Product></td>
                            </tr>)}</tbody>
                        </S.Table>
                    </S.TableWrapper>
                    {pages > 1 && <S.Controls>
                        <Button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Назад</Button>
                        <span>Сторінка {page} з {pages}</span>
                        <Button type="button" disabled={page === pages} onClick={() => setPage(page + 1)}>Далі</Button>
                    </S.Controls>}
                </>}
            </>}
        </div>
        </section>
    )
}

export default RedirectReportPage
