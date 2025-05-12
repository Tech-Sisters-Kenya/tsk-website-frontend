'use client';

import React, { useCallback, useState } from 'react';
import TagToggleChip from './TagToggleChip';

const TAGS = [
  'All',
  'Career & Growth',
  'Community Stories',
  'Event Highlights',
  'Opportunities & Resources',
  'Sisterhood & Lifestyle',
  'Tech Tips & Tutorials',
];

function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  console.log(selectedTags);

  const handleToggle = useCallback((tag: string, value: boolean) => {
    setSelectedTags((prev) => (value ? [...prev, tag] : prev.filter((t) => t !== tag)));
  }, []);

  return (
    <div>
      {TAGS.map((tag) => (
        <TagToggleChip
          key={tag}
          label={tag}
          selected={selectedTags.includes(tag)}
          onToggle={(value) => handleToggle(tag, value)}
        />
      ))}
    </div>
  );
}

export default TagSelector;
