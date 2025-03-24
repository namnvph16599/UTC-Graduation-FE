/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

export enum LocalStorageKeyEnum {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}
export function setItemLocalstorage(key: LocalStorageKeyEnum, value = '') {
  typeof localStorage !== 'undefined' && localStorage.setItem(key, value);
}

export function getItemLocalstorage(key: LocalStorageKeyEnum) {
  return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
}

export function removeItemLocalstorage(key: LocalStorageKeyEnum) {
  typeof localStorage !== 'undefined' && localStorage.removeItem(key);
}
