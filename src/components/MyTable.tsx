import React from 'react'

type Data = {
  key: number
  name: string
  age: number
  address: string
}
const data: Data[] = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 10 + i,
    address: `London, Park Lane no. ${i}`
  })
}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]
function filter(arr: Data[], age = 0): Data[] {
  return arr.filter(item => item.age > age)
}
const MyTable: React.FC = () => {
  return <>asd</>
}

export default MyTable
