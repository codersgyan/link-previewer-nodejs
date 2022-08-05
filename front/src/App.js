import './App.css';
import Nav from './components/Nav';
import LinkPreviewer from './components/LinkPreviewer';
import Footer from './components/Footer';

function App() {
    return (
        <div className="font-sans flex flex-col justify-between">
            <div>
                <Nav />
            </div>
            <div className="items-stretch">
                <LinkPreviewer />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
