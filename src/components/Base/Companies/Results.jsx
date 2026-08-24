import * as S from './styles'
import { getCurrencySymbol, getCurrencyName } from '@/data/currencies'
import { getYearById } from '@/data'

const Results = ({ results }) => {

  if (!results) return null;

  // 1. Группируем все данные по Сезонам и Валютам
  const seasonsMap = {};

  const initCurrencyStruct = (season, currency) => {
    if (!seasonsMap[season]) seasonsMap[season] = {};
    if (!seasonsMap[season][currency]) {
      seasonsMap[season][currency] = {
        paymentAmount: 0,
        paymentUSD: 0,
        invoiceAmount: 0,
        invoiceUSD: 0,
      };
    }
  };

  // Собираем платежи
  if (results.payments) {
    Object.entries(results.payments).forEach(([season, currencies]) => {
      Object.entries(currencies).forEach(([currency, values]) => {
        initCurrencyStruct(season, currency);
        seasonsMap[season][currency].paymentAmount += values.amount || 0;
        seasonsMap[season][currency].paymentUSD += values.amountUSD || 0;
      });
    });
  }

  // Собираем инвойсы
  if (results.invoices) {
    Object.entries(results.invoices).forEach(([season, currencies]) => {
      Object.entries(currencies).forEach(([currency, values]) => {
        initCurrencyStruct(season, currency);
        seasonsMap[season][currency].invoiceAmount += values.total || 0;
        seasonsMap[season][currency].invoiceUSD += values.totalUSD || 0;
      });
    });
  }

  // 2. Сортируем сезоны по убыванию
  const sortedSeasons = Object.keys(seasonsMap).sort((a, b) => Number(b) - Number(a));

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          <tr>
            <th>Сезон</th>
            <th>Валюта</th>
            <th>Платежи</th>
            <th>Накладные</th>
            <th>Итог</th>
          </tr>
        </thead>
   
        <tbody>
          {sortedSeasons.map((seasonId) => {
            const currencies = seasonsMap[seasonId];
            const currencyEntries = Object.entries(currencies);
            const hasMultipleCurrencies = currencyEntries.length > 1;

            // Считаем общие итоги по сезону в USD для проверки условия
            let totalSeasonPaymentUSD = 0;
            let totalSeasonInvoiceUSD = 0;

            currencyEntries.forEach(([_, data]) => {
              totalSeasonPaymentUSD += data.paymentUSD;
              totalSeasonInvoiceUSD += data.invoiceUSD;
            });

            const totalSeasonDiffUSD = totalSeasonPaymentUSD - totalSeasonInvoiceUSD;

            return (
              <tr key={`season-group-${seasonId}`} style={{ display: 'contents' }}>
                {/* 1. Рендерим строки для каждой валюты */}
                {currencyEntries.map(([currencyCode, data], index) => {
                  const diffAmount = data.paymentAmount - data.invoiceAmount;
                  const diffUSD = data.paymentUSD - data.invoiceUSD;
                  const symbol = getCurrencySymbol(currencyCode);
                  const currency = getCurrencyName(currencyCode)

                  // Нижняя граница будет либо у последней валюты (если итог USD не нужен), либо у строки итога
                  const isLastRowInSeason = index === currencyEntries.length - 1;
                  const rowStyle = (isLastRowInSeason && !hasMultipleCurrencies) 
                    ? { borderBottom: '2px solid #333' } 
                    : {};

                  return (
                    <tr key={`${seasonId}-${currencyCode}`} style={rowStyle}>
                      <td>{getYearById(Number(seasonId))}</td>
                      <td>{currency}</td>
                      
                      <td>
                        <div>{data.paymentAmount.toLocaleString()} {symbol}</div>
                        <small style={{ color: '#666' }}>{data.paymentUSD.toLocaleString()} $</small>
                      </td>
                      
                      <td>
                        <div>{data.invoiceAmount.toLocaleString()} {symbol}</div>
                        <small style={{ color: '#666' }}>{data.invoiceUSD.toLocaleString()} $</small>
                      </td>
                      
                      <td style={{ fontWeight: 'bold' }}>
                        <div style={{ color: diffAmount >= 0 ? '#2e7d32' : '#c62828' }}>
                          {diffAmount >= 0 ? '+' : ''}{diffAmount.toLocaleString()} {symbol}
                        </div>
                        <small style={{ color: diffUSD >= 0 ? '#2e7d32' : '#c62828' }}>
                          {diffUSD >= 0 ? '+' : ''}{diffUSD.toLocaleString()} $
                        </small>
                      </td>
                    </tr>
                  );
                })}

                {/* 2. Если валют больше одной, добавляем строку "Итого в USD" для всего сезона */}
                {hasMultipleCurrencies && (
                  <tr style={{ 
                    backgroundColor: '#f5f5f5', 
                    fontWeight: 'bold', 
                    borderBottom: '2px solid #333' 
                  }}>
                    <td>{getYearById(Number(seasonId))}</td>
                    <td style={{ color: '#555' }}>Всего USD</td>
                    <td>{totalSeasonPaymentUSD.toLocaleString()} $</td>
                    <td>{totalSeasonInvoiceUSD.toLocaleString()} $</td>
                    <td style={{ color: totalSeasonDiffUSD >= 0 ? '#2e7d32' : '#c62828' }}>
                      {totalSeasonDiffUSD >= 0 ? '+' : ''}{totalSeasonDiffUSD.toLocaleString()} $
                    </td>
                  </tr>
                )}
              </tr>
            );
          })}
        </tbody>
      </S.Table>
    </S.Wrapper>
  )
}

export default Results;
