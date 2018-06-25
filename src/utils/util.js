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

module.exports = {
  formatTime: formatTime,
  evaluateExpression: evaluateExpression
}
