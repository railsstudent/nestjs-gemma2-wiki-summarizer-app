import { AgentContent } from '../types/agent-content.type';

const commonStyleClasses = 'p-1 border border-solid border-[#464646]';

const splitLines = (content: string): string => {
  const lines = content.split(/\r?\n/).filter((line) => !!line);
  return `${lines.map((line) => `${line.trim()}<br />`).join('')}`;
};

export const toDivRows = (contents: AgentContent[]): string => {
  return contents
    .map(
      ({ role, content }) => `
      <div class="text-[1rem] flex text-[#464646]">
        <span class="w-1/5 ${commonStyleClasses}">${role}</span>
        <div class="markdown w-4/5 ${commonStyleClasses}">${splitLines(content)}</div>
      </div>`,
    )
    .join('');
};

export const toListItems = (items: string[]): string => {
  return items.map((item) => `<li class="text-[1rem]">${item}</li>`).join('\n');
};
