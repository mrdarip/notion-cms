interface RichTextAnnotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface RichTextObject {
  type: 'text';
  text: {
    content: string;
    link: { url: string } | null;
  };
  annotations: RichTextAnnotations;
  plain_text: string;
  href: string | null;
}

interface RichTextProps {
  text: RichTextObject;
  index: number;
}

export function RichText({ text, index }: RichTextProps) {
  const { annotations, href } = text;
  const content = text.text.content;

  // Build className for styling
  const classes: string[] = [];
  if (annotations.bold) classes.push('font-bold');
  if (annotations.italic) classes.push('italic');
  if (annotations.strikethrough) classes.push('line-through');
  if (annotations.underline) classes.push('underline');
  if (annotations.code) classes.push('code');
  if (annotations.color !== 'default') {
    classes.push(`text-${annotations.color}`);
  }


  const className = classes.length > 0 ? classes.join(' ') : undefined;

  // Create the styled span
  const styledContent = (
    <span key={index} className={className}>
      {content}
    </span>
  );

  // Wrap in link if href exists
  if (href) {
    return (
      <a key={index} href={href} target="_blank">
        {styledContent}
      </a>
    );
  }

  return styledContent;
}
