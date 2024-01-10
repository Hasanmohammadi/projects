const clearCommas = (numberWithCommas: string): number =>
  +numberWithCommas.replaceAll(',', '');

export default clearCommas;
