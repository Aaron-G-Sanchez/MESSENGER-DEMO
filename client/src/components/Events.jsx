export const Events = ({ events }) => {
  return (
    <>
      <ul>
        {events.map((event, idx) => (
          <li key={idx}>{event}</li>
        ))}
      </ul>
    </>
  )
}
