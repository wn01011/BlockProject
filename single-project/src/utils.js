function getTimeFunc(timestamp) {
  const diffTime = (new Date().getTime() - timestamp * 1000) / 1000;
  let total = diffTime;
  const diffDay = Math.floor(diffTime / (24 * 60 * 60));
  total -= diffDay * (24 * 60 * 60);
  const diffHour = Math.floor(total / (60 * 60));
  total -= diffHour * 3600;
  const diffMin = Math.floor(total / 60);
  total -= diffMin * 60;
  const diffSec = Math.floor(total);
  let text = diffDay
    ? diffDay + " 일"
    : diffHour
    ? diffHour + " 시간"
    : diffMin
    ? diffMin + " 분"
    : diffSec + " 초";
  text += " 전";
  return {
    Day: diffDay,
    Hour: diffHour,
    Minute: diffMin,
    Second: diffSec,
    text,
  };
}

function weiToEther(_wei) {
  const ether = Math.floor(Math.pow(10, -15) * _wei) / 1000;
  return ether;
}

export { getTimeFunc, weiToEther };
