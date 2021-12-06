export function createRect (size: number, bgColor = '#680D12') {
  return `data:image/svg+xml,<svg height="${size}" width="${size}" xmlns="http://www.w3.org/2000/svg"><rect fill="${encodeURIComponent(bgColor)}" x="0" y="0" height="${size}" width="${size}"></rect></svg>`
}
