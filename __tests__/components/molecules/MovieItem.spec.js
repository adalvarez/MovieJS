import MovieItem from "../../../src/components/molecules/MovieItem";

describe("Snapshot testing for MovieItem component", () => {
  it("Should render correctly and match snapshot", () => {
    const Component = renderer.create(
      <MovieItem title="The Revenant" release_date="2015-12-25"/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

