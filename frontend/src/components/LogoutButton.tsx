import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <button type="button" onClick={handleLogout}>
        ログアウト
        </button>
        )
    }
        export default LogoutButton