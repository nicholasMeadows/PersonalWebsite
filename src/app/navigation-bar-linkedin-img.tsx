'use client';
export default function NavigationBarLinkedinImg() {
    return <img src={'linkedin-logo.png'} style={{
        width: 'auto',
        height: '100%',
        marginRight: '1em',
        cursor: 'pointer'
    }} onClick={() => {
        window.open('https://www.linkedin.com/in/nicholasmeadows/')
    }}/>
}