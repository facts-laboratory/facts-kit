export function checkTag(tagName: string, tag?: any) {
  if (!tag) throw new Error(`Missing tag ${tagName} from ANS-110.`);
  return tag;
}
