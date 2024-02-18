export const sortData = (field: string, direction: boolean, arr: any[]) => {
  if (direction) {
    return arr.sort((a, b) => {
      return a[field] > b[field] ? 1 : -1;
    });
  } else {
    return arr.sort((a, b) => {
      return a[field] > b[field] ? -1 : 1;
    });
  }
};
