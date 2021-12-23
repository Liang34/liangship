import { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {// value为input的输入值
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)// 在下次value改变触发更新时，如果没有执行setTimeout则会清理当前定时器从而达到防抖效果
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce;
