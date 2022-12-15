import logo from './emblem.png';

/**
 * Вывод header
 */
export const Header = () => {
    return (
        <header className="app-header">
            <img className="logo" src={logo} alt=""/>
            <a href="/" className="header__link link">
                <span>Last.fm</span>
            </a>
            <div className="wrap">
                <form method="get" text="formx2" action="/search" target="_blank">
                    <input type="search" placeholder="Search for music..." className="search-main" name="id"/>
                </form>
            </div>
        </header>
    );
}