const transformStr = (str: string, type: 'encode' | 'decode'): string => {
  let transformedStr: string = '';
  let offset = -4;
  if (type === 'encode') {
    offset = Math.abs(offset);
  }

  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0) {
      const newCode: number = str.charCodeAt(i) + offset;
      transformedStr += String.fromCharCode(newCode);
    } else {
      transformedStr += str.charAt(i);
    }
  }

  return transformedStr;
}

export const encodeTranslation = (translations: { [key: string]: any }): string => {
  const translationStr = JSON.stringify(translations);

  return transformStr(translationStr, 'encode');
}

export const decodeTranslation = (encodedTranslation: string): { [key: string]: any } => {
  const decodedStr = transformStr(encodedTranslation, 'decode');

  return JSON.parse(decodedStr);
}
