import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
// components
import Movies from "../src/components/Movies";
// data
import { movies } from "../src/data";

Enzyme.configure({ adapter: new Adapter() });

describe("Movies", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Movies />);
  });
  it("should render one <h1 /> first, inside of the <div />", () => {
    expect(wrapper.children().first().type()).to.equal("h1");
  });

  it("should render 'Movies Page' inside of the <h1 />", () => {
    expect(wrapper.children().first().text()).to.contain("Movies Page");
  });

  it("should render a <div /> for each movie", () => {
    expect(wrapper.children().find("div").length).to.equal(3);
  });

  it("should render the right content for each movie", () => {
    const movieContainers = wrapper.children().find("div");
    expect(movieContainers.length).to.equal(3);
    movieContainers.forEach((movie, i) => {
      console.log("text: ", movie.text());
      expect(movie.text()).to.contain(movies[i].title);
      expect(movie.text()).to.contain(movies[i].time);
      movies[i].genres.forEach((genre) => {
        expect(movie.text()).to.contain(genre);
      });
    });
  });
});
