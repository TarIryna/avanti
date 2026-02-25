export function buildParams(row) {
  return Object.entries(row)
    .filter(([key, value]) =>
      key.includes('|') &&
      value !== null &&
      value !== undefined &&
      value !== ''
    )
    .map(([key, value]) => {
      const [name, id] = key.split('|');
      return `<param name="${name.trim()}" id="${id.trim()}">${value}</param>`;
    })
    .join('\n');
}
  