import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import React from 'react';

export default function Page() {
  <SimpleEditor content="<p>Hello</p>" onChange={(html) => console.log(html)} />;
}
