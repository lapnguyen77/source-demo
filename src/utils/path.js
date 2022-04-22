export function getMenuKeyByPath(pathname) {
  return pathname.replace(/(^\/+|\/+$)/mg, '')
}
