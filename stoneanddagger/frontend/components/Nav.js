import Link from 'next/link';
const Nav = () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/about">
            <a>About</a>
        </Link>
        <Link href="/customOrder">
            <a>Custom Order</a>
        </Link>
        <Link href="/necklaces">
            <a>Necklaces</a>
        </Link>
        <Link href="/rings">
            <a>Rings</a>
        </Link>
        <Link href="/cuffs">
            <a>Cuffs</a>
        </Link>
    </div>
)

export default Nav;