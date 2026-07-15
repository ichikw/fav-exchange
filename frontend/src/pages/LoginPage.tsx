import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()

    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = async () => {
        setMessage('')

        if (!loginId || !password) {
            setMessage('ログインIDとパスワードを入力してください')
            return
        }

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loginId,
                    password,
                }),
            })

            if (!response.ok) {
                setMessage('ログインIDまたはパスワードが違います')
                return
            }

            navigate('/goods')
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    return (
        <main>
            <h1>グッズ交換アプリ</h1>

            <section>
                <h2>ログイン</h2>

                <div>
                    <label htmlFor="loginId">ログインID</label>
                    <input
                        id="loginId"
                        type="text"
                        value={loginId}
                        onChange={(event) => setLoginId(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">パスワード</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="button" onClick={handleLogin}>
                    ログイン
                </button>

                {message && <p>{message}</p>}

                <p>
                    会員でない方は <Link to="/register">新規登録</Link>
                </p>
            </section>
        </main>
    )
}

export default LoginPage