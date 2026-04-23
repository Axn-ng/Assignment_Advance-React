function Greeting({ name }) {
  const now = new Date()
  const currentHour = now.getHours()
  const dayOfWeek = now.toLocaleDateString("en-US", {
    weekday: "long"
  })
  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  })

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening"

  const moodLine =
    currentHour < 12
      ? "A fresh start is a powerful advantage."
      : currentHour < 18
      ? "You are in the middle of your strongest hours."
      : "Wind down with intention and a grateful mindset."

return (
    <header>
      <p>Personalized Greeting</p>
      <h1>{greeting}, {name}</h1>
      <p>Today is {dayOfWeek} — {currentTime}</p>
      <p>Current hour: {currentHour}:00</p>
      <p>{moodLine}</p>
    </header>
  )
}

export default Greeting