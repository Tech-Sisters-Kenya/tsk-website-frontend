'use client';

import React from 'react';
import * as Toggle from '@radix-ui/react-toggle';
import clsx from 'clsx';

type TagToggleChipProps = {
  selected?: boolean;
  onToggle: (value: boolean) => void;
  label: string;
};

const TagToggleChip = function TagToggleChip({
  selected = false,
  onToggle,
  label,
}: TagToggleChipProps) {
  return (
    <Toggle.Root
      pressed={selected}
      onPressedChange={onToggle}
      className={clsx(
        'flex w-full items-center justify-center mb-4 sm:w-auto sm:inline-flex sm:ml-4 border-tsk-primary-dark border-[1px] px-4 py-1 rounded-2xl font-body',
        selected && 'bg-tsk-primary-dark text-white transition-colors delay-75 ease-in-out'
      )}
    >
      {label}
    </Toggle.Root>
  );
};

export default TagToggleChip;
