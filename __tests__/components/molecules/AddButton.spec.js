import AddButton from "../../../src/components/molecules/AddButton";

describe("Snapshot testing for AddButton component", () => {
  it("Should render correctly and match snapshot", () => {
    const addEvent = jest.fn();
    const Component = renderer.create(
      <AddButton addEvent={addEvent}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

