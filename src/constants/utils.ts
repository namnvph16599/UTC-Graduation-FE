import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number | string, currency?: boolean) {
  if (!amount) {
    if (currency) return (0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return '';
  }
  return amount.toLocaleString('vi-VN', currency ? { style: 'currency', currency: 'VND' } : {});
}

export function numberWithDots(num?: number | string) {
  const value = num;
  if (value == null || value === '') return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithUnDots(num?: number | string) {
  const value = num;
  if (value == null || value === '') return '';
  return value.toString().replaceAll(',', '');
}
