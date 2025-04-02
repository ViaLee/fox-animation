import React, { useState } from 'react'


const NavItems = () => {
    const navLinks = [
        { id: 1, name: 'Home', href: '#home' },
        { id: 2, name: 'About', href: '#about' },
        { id: 3, name: 'Projects', href: '#projects' },
        { id: 4, name: 'Experience', href: '#experience' },
        { id: 5, name: 'Contact', href: '#contact' },
    ]
    return (
        <ul className='nav-ul'>
            {navLinks.map(item => {
                return (
                    <li className='nav-li' key={item.id}>
                        <a href={item.href} className='nav-li_a'>{item.name}</a>
                    </li>
                )
            })}
        </ul>
    )
}
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    }
    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-black/90'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center py-5 mx-auto c-space'>
                    <a href='/' className='text-neutral-400 font-bold text-xl hover:text-white transition-colors'>LISHU</a>
                    <button className='text-neutral-400 hover:text-white focus:outline-none sm:hidden flex'
                        aria-label='Toggle menu'>
                        <img src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'}
                            alt='toggle'
                            className='w-6 h-6' onClick={toggleMenu}></img>
                    </button>

                    <nav className='sm:flex hidden'>
                        <NavItems />
                    </nav>
                </div>
            </div>

            <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <nav className='p-5'>
                    <NavItems />
                </nav>
            </div>
        </header>
    )
}

export default Navbar