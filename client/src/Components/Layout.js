import {Link} from 'react-router-dom';
import classes from './Layout.module.css';

function Layout(){
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Prison Management System</div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Register</Link>
                    </li>
                    <li>
                        <Link to='/Prisoner'>Prisoner</Link>
                    </li>
                    <li>
                        <Link to='/Personnel'>Personnel</Link>
                    </li>
                    <li>
                        <Link to='/MoreInfo'>More Tasks</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Layout;