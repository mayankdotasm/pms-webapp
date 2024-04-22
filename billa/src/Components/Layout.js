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
                        <Link to='/ViewRecord'>View Record</Link>
                    </li>
                    <li>
                        <Link to='/Sort'>Stats</Link>
                    </li>
                    <li>
                        <Link to='/AboutUs'>User Guide</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Layout;