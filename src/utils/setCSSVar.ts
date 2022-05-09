export const setCSSVar = (name: string, value: string) =>
  document.documentElement.style.setProperty(name, value);
