import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import NoSidebar from "./layouts/NoSidebar/NoSidebar";
import NothingLayout from "./layouts/NothingLayout/NothingLayout";
import { publicRoute } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = NothingLayout;
            } else if (route.layout === NoSidebar) {
              Layout = NoSidebar;
            }
            return (
              <Route
                key={index}
                exact
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
