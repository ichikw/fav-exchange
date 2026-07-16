import LogoutButton from '../components/LogoutButton'
import { API_BASE_URL } from '../api/config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type OwnedGood = {
    id: number
    userId: number
    goodsName: string
    description: string
    imageUrl: string
}

function GoodsPage() {
    const [goods, setGoods] = useState<OwnedGood[]>([])
    const [goodsName, setGoodsName] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [message, setMessage] = useState('')

    const loadGoods = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/goods`)

            if (!response.ok) {
                setMessage('所持グッズの取得に失敗しました')
                return
            }

            const data = await response.json()
            setGoods(data)
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    useEffect(() => {
        loadGoods()
    }, [])

    const handleCreate = async () => {
        setMessage('')

        if (!goodsName) {
            setMessage('グッズ名を入力してください')
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/goods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 1,
                    goodsName,
                    description,
                    imageUrl,
                }),
            })

            if (!response.ok) {
                setMessage('所持グッズの登録に失敗しました')
                return
            }

            setGoodsName('')
            setDescription('')
            setImageUrl('')
            setMessage('所持グッズを登録しました')
            await loadGoods()
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    const handleDelete = async (id: number) => {
        setMessage('')

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/goods/${id}`,
                {
                    method: 'DELETE',
                },
            )

            if (!response.ok) {
                setMessage('所持グッズの削除に失敗しました')
                return
            }

            setMessage('所持グッズを削除しました')
            await loadGoods()
        } catch {
            setMessage('通信エラーが発生しました')
        }
    }

    return (
        <main>
            <div className="logout-area">
                <LogoutButton />
            </div>
            <h1>所持グッズ一覧</h1>

            <nav>
                <Link to="/wanted">交換希望一覧</Link>
                {' | '}
                <Link to="/post">募集文作成</Link>
            </nav>

            <section>
                <h2>所持グッズ登録</h2>

                <div>
                    <label htmlFor="goodsName">グッズ名</label>
                    <input
                        id="goodsName"
                        type="text"
                        value={goodsName}
                        onChange={(event) => setGoodsName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="description">説明</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl">画像URL</label>
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(event) => setImageUrl(event.target.value)}
                    />
                </div>

                <button type="button" onClick={handleCreate}>
                    登録
                </button>
            </section>

            {message && <p>{message}</p>}

            <section>
                <h2>登録済み所持グッズ</h2>

                {goods.length === 0 ? (
                    <p>登録されている所持グッズはありません。</p>
                ) : (
                    <ul>
                        {goods.map((good) => (
                            <li key={good.id}>
                                <p>グッズ名：{good.goodsName}</p>
                                <p>説明：{good.description}</p>

                                {good.imageUrl && (
                                    <img
                                        src={good.imageUrl}
                                        alt={good.goodsName}
                                        width="150"
                                    />
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDelete(good.id)}
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

export default GoodsPage