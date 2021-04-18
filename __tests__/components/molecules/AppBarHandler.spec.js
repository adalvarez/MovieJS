import AppBarHandler from "../../../src/components/molecules/AppBarHandler";

describe("Snapshot testing for AppBarHandler component", () => {
  it("Should render correctly and match snapshot", () => {
    const schema = [
      {
        label: "Unwatched",
        icon: <div />,
        index: 0,
        panel: function () {
          return (<div />);
        },
      },
      {
        label: "Watched",
        icon: <div/>,
        index: 1,
        panel: function () {
          return (<div />);
        },
      },
    ];
    const Component = renderer.create(
      <AppBarHandler schema={schema}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

