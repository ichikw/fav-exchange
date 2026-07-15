import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type OwnedGood = {
    id: number
    goodsName: string
    description: string
}

type WantedGood = {
    id: number
    goodsName: string
    conditions: string
}

function PostPage() {
    const [goods, setGoods] = useState<OwnedGood[]>([])
    const [wantedGoods, setWantedGoods] = useState<WantedGood[]>([])
    const [selectedGoodId, setSelectedGoodId] = useState('')
    const [selectedWantedId, setSelectedWantedId] = useState('')
    const [postText, setPostText] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadData = async () => {
            try {
                const goodsResponse = await fetch(
                    'http://localhost:8080/api/goods',
                )
                const wantedResponse = await fetch(
                    'http://localhost:8080/api/wanted',
                )

                if (!goodsResponse.ok || !wantedResponse.ok) {
                    setMessage('データの取得に失敗しました')
                    return
                }

                const goodsData = await goodsResponse.json()
                const wantedData = await wantedResponse.json()

                setGoods(goodsData)
                setWantedGoods(wantedData)
            } catch {
                setMessage('通信エラーが発生しました')
            }
        }

        loadData()
    }, [])

    const handleCreateText = () => {
        setMessage('')

        const selectedGood = goods.find(
            (good) => good.id === Number(selectedGoodId),
        )
        const selectedWanted = wantedGoods.find(
            (wantedGood) => wantedGood.id === Number(selectedWantedId),
        )

        if (!selectedGood || !selectedWanted) {
            setMessage('所持グッズと交換希望グッズを選択してください')
            return
        }

        const text = `【交換募集】

譲：${selectedGood.goodsName}
${selectedGood.description ? `説明：${selectedGood.description}` : ''}

求：${selectedWanted.goodsName}
${selectedWanted.conditions ? `条件：${selectedWanted.conditions}` : ''}

交換可能な方がいましたら、ご連絡をお願いします。`

        setPostText(text)
    }

    const handleCopy = async () => {
        if (!postText) {
            setMessage('先に募集文を作成してください')
            return
        }

        try {
            await navigator.clipboard.writeText(postText)
            setMessage('募集文をコピーしました')
        } catch {
            setMessage('コピーに失敗しました')
        }
    }

    return (
        <main>
            <h1>募集文作成・SNS投稿</h1>

            <nav>
                <Link to="/goods">所持グッズ一覧</Link>
                {' | '}
                <Link to="/wanted">交換希望一覧</Link>
            </nav>

            <section>
                <h2>募集内容選択</h2>

                <div>
                    <label htmlFor="ownedGood">譲るグッズ</label>
                    <select
                        id="ownedGood"
                        value={selectedGoodId}
                        onChange={(event) => setSelectedGoodId(event.target.value)}
                    >
                        <option value="">選択してください</option>

                        {goods.map((good) => (
                            <option key={good.id} value={good.id}>
                                {good.goodsName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="wantedGood">希望グッズ</label>
                    <select
                        id="wantedGood"
                        value={selectedWantedId}
                        onChange={(event) => setSelectedWantedId(event.target.value)}
                    >
                        <option value="">選択してください</option>

                        {wantedGoods.map((wantedGood) => (
                            <option key={wantedGood.id} value={wantedGood.id}>
                                {wantedGood.goodsName}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="button" onClick={handleCreateText}>
                    募集文を作成
                </button>
            </section>

            <section>
                <h2>作成した募集文</h2>

                <textarea
                    value={postText}
                    readOnly
                    rows={12}
                    cols={50}
                />

                <div>
                    <button type="button" onClick={handleCopy}>
                        コピー
                    </button>
                </div>
            </section>

            {message && <p>{message}</p>}
        </main>
    )
}

export default PostPage