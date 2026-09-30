

export async function LoginRepository(email: string, senha: string) {
  const response = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            senha
        })
    })

    if (response.ok) {
        const data = await response.json()
        return data
    }
}