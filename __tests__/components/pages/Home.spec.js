import Home from "../../../src/components/pages/Home";

describe("Snapshot testing for Home component", () => {
  it("Should render correctly and match snapshot", () => {
    const Component = renderer.create(<Home/>);
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

