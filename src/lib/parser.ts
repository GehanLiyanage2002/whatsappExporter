import { Message, ChatData } from "@/types";

export function parseChatFile(text: string): ChatData {
  const lines = text.split("\n");
  const parsedMessages: Message[] = [];
  const participantsSet = new Set<string>();
  const datesSet = new Set<string>();

  const lineRegex = /^\[?(\d{1,4}[-\/\.]\d{1,2}[-\/\.]\d{1,4})[,\s]+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:[AaPp][Mm])?)\]?\s*-?\s*(.*?):\s(.*)$/i;
  const sysRegex = /^\[?(\d{1,4}[-\/\.]\d{1,2}[-\/\.]\d{1,4})[,\s]+(\d{1,2}:\d{2}(?::\d{2})?\s*(?:[AaPp][Mm])?)\]?\s*-?\s*(.*)$/i;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine.trim()) continue;
    
    const line = rawLine
      .replace(/[\u200E\u200F\u202A-\u202E]/g, '')
      .replace(/\u202F/g, ' ')
      .trim();

    let match = line.match(lineRegex);
    if (match) {
      const date = match[1].replace(/[\.\-]/g, "/");
      const sender = match[3].trim();
      parsedMessages.push({
        id: `msg-${i}`,
        date,
        time: match[2],
        sender,
        text: match[4],
        isSystem: false,
      });
      participantsSet.add(sender);
      datesSet.add(date);
      continue;
    }

    match = line.match(sysRegex);
    if (match && !match[3].includes(": ")) {
      const date = match[1].replace(/[\.\-]/g, "/");
      parsedMessages.push({
        id: `sys-${i}`,
        date,
        time: match[2],
        sender: "System",
        text: match[3],
        isSystem: true,
      });
      datesSet.add(date);
      continue;
    }

    if (parsedMessages.length > 0) {
      parsedMessages[parsedMessages.length - 1].text += "\n" + rawLine;
    }
  }

  return {
    messages: parsedMessages,
    participants: Array.from(participantsSet),
    dates: Array.from(datesSet),
  };
}
