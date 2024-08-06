import { AgentContent } from '../types/agent-content.type';

const commonStyleClasses = 'p-1 border border-solid border-[#464646]';

const splitLines = (content: string): string => {
  const lines = content.split(/\r?\n/).filter((line) => !!line);
  return `<p class="w-4/5 ${commonStyleClasses}">
    ${lines.map((line) => `${line.trim()}<br />`).join('')}
  </p>`;
};

export const toDivRow = (contents: AgentContent[]): string => {
  return contents
    .map(
      ({ role, content }) => `
      <div class="text-[1rem] flex text-[#464646]">
        <span class="w-1/5 ${commonStyleClasses}">${role}</span>
        ${splitLines(content)}
      </div>`,
    )
    .join('');
};
