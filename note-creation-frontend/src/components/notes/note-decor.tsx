export default function NoteDecor({
  content,
  color
}: {
  content: string
  color: string
}) {
  return (
    <article className='note note__decor' style={{ background: color }}>
      <p>{content}</p>
    </article>
  )
}
