let downloadBlob = function (response: any){
  debugger
  const { data, headers } = response
  const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
  // console.log(fileName)
  // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
  //const blob = new Blob([JSON.stringify(data)], ...)
  const blob = new Blob([data], {type: headers['content-type']})
  let dom = document.createElement('a')
  let url = window.URL.createObjectURL(blob)
  dom.href = url
  dom.download = decodeURI(fileName)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode?.removeChild(dom)
  window.URL.revokeObjectURL(url)
}

const handleBlobError = function (error: any, callBack: any, that: any){
  let reader = new FileReader()
  reader.onload = e => {
    callBack.call(that, e.target?.result)
  }
  reader.readAsText(error.response.data)
}

export {downloadBlob, handleBlobError}
