export async function initializeDatabase() {
  try {
    const response = await fetch("/api/init-db")
    const data = await response.json()

    if (!data.success) {
      console.error("[v0] Failed to initialize database:", data.error)
      return false
    }

    console.log("[v0] Database initialized successfully")
    return true
  } catch (error) {
    console.error("[v0] Error initializing database:", error)
    return false
  }
}
