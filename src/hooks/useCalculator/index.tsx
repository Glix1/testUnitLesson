const useCalculator = () => {
  const addition = (value1: string, value2: string) => {
    return Number(Number(value1) + Number(value2)).toString();
  };

  const substraction = (value1: string, value2: string) => {
    return Number(Number(value1) - Number(value2)).toString();
  };

  const square = (value1: string) => {
    return(Number(Number(value1) * Number(value1))).toString();
  };

  const modulo = (value1: string, value2:string) => {
    return(Number(Number(value1) % Number(value2))).toString();
  };

  const division = (value1: string, value2:string) => {
    return(Number(Number(value1) / Number(value2))).toString();
  };

  return {
    addition,
    substraction,
    square,
    modulo,
    division,
  };
};

export default useCalculator;
