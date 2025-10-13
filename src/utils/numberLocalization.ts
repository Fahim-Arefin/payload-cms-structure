// src/utils/numberLocalization.ts

/**
 * Converts English numerals (0-9) to Bengali numerals (০-৯)
 */
export function convertToBengaliNumerals(text: string): string {
  const englishToBengali: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯'
  }

  return text.replace(/[0-9]/g, (digit) => englishToBengali[digit] || digit)
}

/**
 * Formats a number with locale-specific formatting and numerals
 */
export function formatLocalizedNumber(
  value: number, 
  language: 'en' | 'bn'
): string {
  const formattedNumber = value.toLocaleString()
  
  // Debug logging
  console.log('formatLocalizedNumber debug:', { value, language, formattedNumber })
  
  if (language === 'bn') {
    const bengaliNumber = convertToBengaliNumerals(formattedNumber)
    console.log('Bengali conversion:', { formattedNumber, bengaliNumber })
    return bengaliNumber
  }
  
  return formattedNumber
}