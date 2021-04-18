import MovieDetail from "../../../src/components/molecules/MovieDetail";

describe("Snapshot testing for MovieDetail component", () => {
  it("Should render correctly and match snapshot", () => {
    const Component = renderer.create(
      <MovieDetail release_date="2015-12-25" runtime={137} vote_average={6.9} watched={false}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

