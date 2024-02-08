import Jumbotron from "../components/Jumbotron";

const NoMatch = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Page not found 404</h1>
        <h1>
          <span role="img" aria-label="Wilted flower emoji">
          🥀
          </span>
        </h1>
      </Jumbotron>
    </div>
  );
};

export default NoMatch;
