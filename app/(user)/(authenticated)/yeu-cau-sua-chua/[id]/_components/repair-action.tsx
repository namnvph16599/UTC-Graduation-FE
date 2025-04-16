'use client';
import React from 'react';
import { RepairEntity } from '@/src/graphql/type.interface';

type Props = {
  repair: RepairEntity;
};

export const RepairAction = ({ repair }: Props) => {
  return <div>RepairAction</div>;
};
