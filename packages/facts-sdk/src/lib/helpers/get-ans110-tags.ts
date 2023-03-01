import { checkTag } from './check-tag';

export function getAns110Tags(tags: { name: string; value: string }[]) {
  const topics = tags.filter((t) => t.name.includes('Topic'));
  const newTags = [
    {
      name: 'Title',
      value: checkTag(
        'Title',
        tags?.filter((t) => t.name === 'Title')[0]?.value
      ),
    },
    {
      name: 'Type',
      value: checkTag('Type', tags?.filter((t) => t.name === 'Type')[0]?.value),
    },
    {
      name: 'Description',
      value: checkTag(
        'Description',
        tags?.filter((t) => t.name === 'Description')[0]?.value
      ),
    },
  ];

  const standardTags = [{ name: 'Implements', value: 'ANS-110' }];
  return [...standardTags, ...newTags, ...topics];
}
