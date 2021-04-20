/// <reference types="react-scripts" />
declare namespace qrcode {
  function decode(file: string | null): void
  function callback(res: string): void
}
declare module '*.md' {
  const content: string
  export default content
}
