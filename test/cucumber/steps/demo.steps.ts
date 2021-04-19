import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./test/cucumber/features/demo.feature");

defineFeature(feature, (test) => {
  test("Demo Scenario", ({ given, when, then }) => {
    given("To check if given step is called and print something", () => {
      console.log("given");
    });
    when("To check if When step is called and print something", () => {
      console.log("when");
    });
    then("To check if Then step is called and print something", () => {
      console.log("then");
    });
  });
});
