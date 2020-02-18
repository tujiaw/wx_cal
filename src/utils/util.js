const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function evaluateExpression(express, callback) {
  wx.request({
    url: 'https://ningto.com/eval/' + encodeURIComponent(express),
    success: function (res) {
      console.log(res);
      callback(res.data);
    },
    complete: function() {
      callback();
    }
  })
}

function calExpression(express) {
  if (express.length === 0) {
    return
  }
  var a = express[0]
  if (!(a == '+' || a == '-' || (a >= '0' && a <= '9'))) {
    return
  }
  var b = express[express.length - 1]
  if (!(b >= '0' && b <= '9')) {
    express = express.slice(0, express.length - 1)
  }

  var dataList = new Array()
  var symbolList = new Array() 
  var data = ""
  for (var i = 0; i < express.length; i++) {
    var a = express[i]
    if (i === 0) {
      data += a
    } else {
      if (a === '+' || a === '-' || a === '*' || a === '/') {
        if (data.length > 0) {
          symbolList.push(a)
          dataList.push(data)
          data = ""
        }
      } else {
        data += a
      }
    }
  }

  if (data.length > 0) {
    dataList.push(data)
  }

  if (dataList.length < 2) {
    return express
  }

  var sum = parseFloat(dataList[0])
  for (var i = 1, j = 0; i < dataList.length, j < symbolList.length; i++, j++) {
    var symbol = symbolList[j]
    if (symbol === '+') {
      sum += parseFloat(dataList[i])
    } else if (symbol === '-') {
      sum -= parseFloat(dataList[i])
    } else if (symbol === '*') {
      sum *= parseFloat(dataList[i])
    } else if (symbol === '/') {
      sum /= parseFloat(dataList[i])
    } else {
      break
    }
  }
  
  if (!isNaN(sum)) {
    var strSum = sum + ''
    var p = (sum + '').indexOf('.')
    if (p != -1 && (strSum.length - p - 1) > 4) {
      return sum.toFixed(4)
    }
  }
  return sum
}

module.exports = {
  formatTime,
  evaluateExpression,
  calExpression,
}
