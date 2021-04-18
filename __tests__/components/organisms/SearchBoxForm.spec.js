import SearchBoxForm from "../../../src/components/organisms/SearchBoxForm";

describe("Snapshot testing for SearchBoxForm component", () => {
  it("Should render correctly and match snapshot", () => {
    const saveMovie = jest.fn();
    const Component = renderer.create(
      <SearchBoxForm saveMovie={saveMovie}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

