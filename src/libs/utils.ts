import { twMerge } from 'tailwind-merge'

export function cn (...inputs) {
  const classes = inputs
    .filter((input) => input)
    .flatMap((input) =>
      typeof input === 'object'
        ? Object.entries(input).filter(([, value]) => value).map(([key]) => key)
        : input.split(' ')
    )

  return twMerge(...classes)
}
