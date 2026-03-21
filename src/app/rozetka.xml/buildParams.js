export function buildParams(row, escapeXML) {
  return Object.entries(row)
    .filter(([key, value]) =>
      key.includes('|') &&
      value !== null &&
      value !== undefined &&
      value !== ''
    )
    .map(([key, value]) => {
      const [name, id] = key.split('|');

      return `<param name="${escapeXML(name.trim())}" id="${escapeXML(id.trim())}">
${escapeXML(value)}
</param>`;
    })
    .join('\n');
}
