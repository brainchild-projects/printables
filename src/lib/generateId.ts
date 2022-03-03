function dash(str: string): string {
  return str[0].toLowerCase() + str.substring(1).replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

export default function generateId(prefix: string, name: string): string {
  return `${prefix}-${dash(name)}`;
}
