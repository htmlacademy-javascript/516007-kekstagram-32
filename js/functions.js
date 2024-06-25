// Функция для проверки длины строки

function getStringLength(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

// Функция для проверки, является ли строка палиндромом

function searchPolindrom(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let invertString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    invertString += normalizedString[i];
  }
  return invertString === normalizedString;
}

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

function getNumber(value) {
  const convertedToString = value.toString();
  let convertedToNumber = '';

  for (let i = 0; i < convertedToString.length; i++) {
    if (!isNaN(parseInt(convertedToString[i], 10))) {
      convertedToNumber += convertedToString[i];
    }
  }

  if (convertedToNumber !== '') {
    return parseInt(convertedToNumber, 10);
  }
  return NaN;
}
