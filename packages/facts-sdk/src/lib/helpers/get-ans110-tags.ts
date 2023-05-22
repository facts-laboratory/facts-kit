export function getAns110Tags(tags: { name: string; value: string }[]) {
  const topics = tags.filter((t) => t.name.includes('Topic'));
  const newTags = [
    {
      name: 'Title',
      value: tags?.filter((t) => t.name === 'Title')[0]?.value || 'Untitled.',
    },
    {
      name: 'Type',
      value: tags?.filter((t) => t.name === 'Type')[0]?.value || 'no-type',
    },
    {
      name: 'Description',
      value:
        tags?.filter((t) => t.name === 'Description')[0]?.value ||
        "Missing tag 'Description'.",
    },
    {
      name: 'Content-Type',
      value: tags?.filter((t) => t.name === 'Content-Type')[0]?.value || '',
    },
  ];

  const standardTags = [{ name: 'Implements', value: 'ANS-110' }];
  return [...standardTags, ...newTags, ...topics];
}
