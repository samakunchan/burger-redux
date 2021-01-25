import classes from './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
