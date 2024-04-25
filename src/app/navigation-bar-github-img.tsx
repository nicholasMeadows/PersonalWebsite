'use client';
export default function NavigationBarGithubImg() {
    return <img src={'github-logo.png'} style={{
        width: 'auto',
        height: '100%',
        marginRight: '1em',
        cursor: 'pointer'
    }} onClick={() => {
        window.open('https://github.com/nicholasMeadows')
    }}/>
}