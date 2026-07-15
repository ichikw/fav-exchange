import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type WantedGood = {
    id: number
    userId: number
    goodsName: string
    conditions: string
}

function WantedPage() {
    const [wantedGoods, setWantedGoods] = useState<WantedGood[]>([])
    const [goodsName, setGoodsName] = useState('')
    const [conditions, setConditions] = useState('')
    const [message, setMessage] = useState('')

    const loadWantedGoods = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/wanted')

            if (!response.ok) {
                setMessage('交換希望グッズの取得に失敗しました')
                return
            }

            const data = await response.json()
            setWantedGoods(data)
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    useEffect(() => {
        loadWantedGoods()
    }, [])

    const handleCreate = async () => {
        setMessage('')

        if (!goodsName) {
            setMessage('希望グッズ名を入力してください')
            return
        }

        try {
            const response = await fetch('http://localhost:8080/api/wanted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1,
                    goodsName,
                    conditions,
                }),
            })

            if (!response.ok) {
                setMessage('交換希望グッズの登録に失敗しました')
                return
            }

            setGoodsName('')
            setConditions('')
            setMessage('交換希望グッズを登録しました')
            await loadWantedGoods()
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    const handleDelete = async (id: number) => {
        setMessage('')

        try {
            const response = await fetch(
                `http://localhost:8080/api/wanted/${id}`,
                {
                    method: 'DELETE',
                },
            )

            if (!response.ok) {
                setMessage('交換希望グッズの削除に失敗しました')
                return
            }

            setMessage('交換希望グッズを削除しました')
            await loadWantedGoods()
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    return (
        <main>
            <h1>交換希望一覧</h1>

            <nav>
                <Link to="/goods">所持グッズ一覧</Link>
                {' | '}
                <Link to="/post">募集文作成</Link>
            </nav>

            <section>
                <h2>交換希望グッズ登録</h2>

                <div>
                    <label htmlFor="goodsName">希望グッズ名</label>
                    <input
                        id="goodsName"
                        type="text"
                        value={goodsName}
                        onChange={(event) => setGoodsName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="conditions">条件</label>
                    <textarea
                        id="conditions"
                        value={conditions}
                        onChange={(event) => setConditions(event.target.value)}
                    />
                </div>

                <button type="button" onClick={handleCreate}>
                    登録
                </button>
            </section>

            {message && <p>{message}</p>}

            <section>
                <h2>登録済み交換希望グッズ</h2>

                {wantedGoods.length === 0 ? (
                    <p>登録されている交換希望グッズはありません。</p>
                ) : (
                    <ul>
                        {wantedGoods.map((wantedGood) => (
                            <li key={wantedGood.id}>
                                <p>希望グッズ名：{wantedGood.goodsName}</p>
                                <p>条件：{wantedGood.conditions}</p>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(wantedGood.id)}
                                >
                                    削除
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default WantedPage