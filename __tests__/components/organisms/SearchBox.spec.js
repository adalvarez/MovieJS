import SearchBox from "../../../src/components/organisms/SearchBox";

describe("Snapshot testing for SearchBox component", () => {
  it("Should render correctly and match snapshot", () => {
    const selectEvent = jest.fn();
    const Component = renderer.create(
      <SearchBox selectEvent={selectEvent}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

