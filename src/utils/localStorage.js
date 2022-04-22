export const readStore = name => new Promise((resolve) => {
  const data = localStorage.getItem(name)
  resolve(JSON.parse(data))
})

export const writeStore = (name, content) => new Promise((resolve) => {
  localStorage.setItem(name, JSON.stringify(content))
  resolve()
})
