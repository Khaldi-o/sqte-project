import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
  return Buffer.from(uint8Array).toString('base64');
};