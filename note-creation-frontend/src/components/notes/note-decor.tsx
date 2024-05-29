type NoteDecorProps = {
  content: string
  color: 'pink' | 'yellow' | 'pink-light' | 'yellow-light' | 'blue-light'
  grado?: number
  top?: number
  left?: number
  right?: number
  bottom?: number
}

export default function NoteDecor({
  content,
  color,
  grado,
  top,
  left,
  right,
  bottom
}: NoteDecorProps) {
  return (
    <article
      className='note note__decor'
      style={{
        background: `hsl(var(--card-variant-${color})) `,
        transform: `rotate(${grado}deg)`,
        top: `${top}rem`,
        left: `${left}rem`,
        right: `${right}rem`,
        bottom: `${bottom}rem`
      }}
    >
      <p>{content}</p>
    </article>
  )
}
