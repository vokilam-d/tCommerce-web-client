type Translation = { [key: string]: any };

const transformStr = (str: string, type: 'encode' | 'decode'): string => {
  let transformedStr: string = '';
  let offset = -3;
  if (type === 'encode') {
    offset = Math.abs(offset);
  }

  for (let i = 0; i < str.length; i++) {
    if (i % 3 === 0) {
      const newCode: number = str.codePointAt(i) + offset;
      transformedStr += String.fromCodePoint(newCode);
    } else {
      transformedStr += str.charAt(i);
    }
  }

  return transformedStr;
}

// FOR SOME REASON, AFTER THIS FUNCTION TRANSLATIONS ARE IN INVALID ENCODING, WHEN TRANSFERRED TO BROWSER IN HTML
export const encodeTranslation = (translations: Translation): string => {
  const translationStr = JSON.stringify(translations);

  return transformStr(translationStr, 'encode');
}

export const decodeTranslation = (encodedTranslation: string): Translation => {
  const decodedStr = transformStr(encodedTranslation, 'decode');

  return JSON.parse(decodedStr);
}
