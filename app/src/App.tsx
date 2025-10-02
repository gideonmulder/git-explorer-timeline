import { GitDataProvider } from "./services/gitdata/GitDataStore";
import Menu from "./ui/common/Menu";
import RouteConfiguration from "./ui/common/RouteConfiguration";



const App = () => {
    return (
        <GitDataProvider>
            <RouteConfiguration>
                <Menu />
            </RouteConfiguration>
        </GitDataProvider>
    );
};

export default App;