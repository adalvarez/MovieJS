import MovieAccordion from "../../../src/components/organisms/MovieAccordion";

describe("Snapshot testing for MovieAccordion component", () => {
  it("Should render correctly and match snapshot", () => {
    const updateMovie = jest.fn();
    const Component = renderer.create(
      <MovieAccordion schema={[]} updateMovie={updateMovie}/>
    );
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

