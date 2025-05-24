import './loader.css'
export default function Loader() {
    return (
        <div style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
            marginBottom: '100px'
        }}>
            <span className="loader"></span>
        </div>

    )
}
