import './loader.css'
export default function Loader() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
            marginBottom: '100px',
            marginLeft:'auto',
            marginRight:'auto',
        }}>
            <span className="loader"></span>
        </div>

    )
}
