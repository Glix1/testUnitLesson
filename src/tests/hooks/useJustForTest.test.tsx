import { renderHook } from "@testing-library/react-hooks";
import useJustForTest, { User } from "../../hooks/useJustForTest";

test("show multiple examples", () => {
  const { result } = renderHook(() => useJustForTest());
  const {
    testBoolTrue,
    testAssertEquals,
    testToBeInstanceOf,
    testToHaveReturned,
    toContainEqual,
    testToStrictEqual,
    testToBeLessThan,
    testToBeNull
  } = result.current;

  expect(testBoolTrue()).toBeTruthy();
  expect(testAssertEquals()).toEqual("same");
  expect(1).not.toBeNaN();
  expect(testToBeInstanceOf()).toBeInstanceOf(User);
  const fnTest = jest.fn(testToHaveReturned);
  fnTest();
  expect(fnTest).toHaveReturnedWith(0);
  const equal = [{"delicious": true, "sour": false}, {"a": "a", "b": "b"}];
  expect(toContainEqual()).toContainEqual(equal[0]);
  expect(testToStrictEqual()).toStrictEqual([equal[0]]);
  expect(testToBeLessThan()).toBeLessThan(2000);
  expect(testToBeNull()).toBeNull();
});
