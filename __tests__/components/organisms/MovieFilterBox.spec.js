import MovieFilterBox from "../../../src/components/organisms/MovieFilterBox";

describe("Snapshot testing for MovieFilterBox component", () => {
  it("Should render correctly and match snapshot", () => {
    const filterByText = jest.fn();
    const Component = renderer.create(
      <MovieFilterBox filterByText={filterByText}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

