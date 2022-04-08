import { renderHook } from "@testing-library/react-hooks";
import useCalculator from "../../hooks/useCalculator"

test("Test Substraction", () => {
    const { result } = renderHook(() => useCalculator());
    const {
        addition,
        substraction,
        square
    } = result.current;

    expect(addition('5', '2')).toMatch('7');
    expect(substraction('5', '2')).toMatch('3');
    expect(square('5')).toMatch('25');

});