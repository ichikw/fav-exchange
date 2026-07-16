import { API_BASE_URL } from '../api/config'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [loginId, setLoginId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')

    const handleRegister = async () => {
        setMessage('')

        if (!name || !loginId || !email || !password || !passwordConfirm) {
            setMessage('すべての項目を入力してください')
            return
        }

        if (password !== passwordConfirm) {
            setMessage('パスワードが一致しません')
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    loginId,
                    email,
                    password,
                }),
            })

            if (!response.ok) {
                setMessage('登録に失敗しました')
                return
            }

            navigate('/login')
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    return (
        <main>
            <h1>グッズ交換アプリ</h1>

            <section>
                <h2>新規登録</h2>

                <div>
                    <label htmlFor="name">ニックネーム</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

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
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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

                <div>
                    <label htmlFor="passwordConfirm">パスワード確認</label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(event) => setPasswordConfirm(event.target.value)}
                    />
                </div>

                <button type="button" onClick={handleRegister}>
                    登録
                </button>

                {message && <p>{message}</p>}

                <p>
                    すでに会員の方は <Link to="/login">ログイン</Link>
                </p>
            </section>
        </main>
    )
}

export default RegisterPage