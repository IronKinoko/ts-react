# Changelog

## 这不是Changelog

这份文件内容的来源于 `markdown` 用于测试 `typescript react` 读写 `markdown` 的能力

## 代码部分

`customize-cra` 配置上 `raw-loader` 

```js
addWebpackModuleRule({ test: /\.md$/, use: 'raw-loader' })
```

编写 `md.d.ts` 文件消除模块找不到的问题

```ts
declare module '*.md' {
  const content: string
  export default content
}
```

然后由 `react-markdown` 渲染到页面上

```tsx
import React from 'react'
import { Box } from '@material-ui/core'
import ReactMarkDown from 'react-markdown'
import md from './Changelog.md'
const Changelog: React.FC = () => {
  return (
    <Box>
      <ReactMarkDown source={md} />
    </Box>
  )
}

export default Changelog
```