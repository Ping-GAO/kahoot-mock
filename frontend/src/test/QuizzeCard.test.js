import { shallow } from "enzyme";
import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import QuizzeCard from "../components/utilities/QuizzeCard";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe("QuizzeCard", () => {
    const noop = () => {};
    it("should render quizze card with the passed in parameters", () => {
        const args = {
            id: 607841966,
            name: "Test Qui",
            createdAt: "2020-11-17T16:08:16.219Z",
            thumbnail: null,
            setEdit: noop,
        };

        const wrapper = shallow(<QuizzeCard {...args} />);
        
        // use the passed in card title
        expect(wrapper.find(CardHeader).props()).toHaveProperty(
            "title",
            args.name
        );
        
        
        // used the passed in timestamp to created a subheader
        expect(wrapper.find(CardHeader).props()).toHaveProperty(
            "subheader",
            (new Date(args.createdAt)).toDateString()
        );
    });
});
