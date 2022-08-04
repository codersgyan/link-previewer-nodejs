import './App.css';
import Nav from './components/Nav';
import LinkPreviewer from './components/LinkPreviewer';
import Footer from './components/Footer';

function App() {
    return (
        <div className="font-sans bg-mild min-h-screen">
            <Nav />
            <LinkPreviewer />
            <Footer/>
        </div>
    );
}

export default App;
