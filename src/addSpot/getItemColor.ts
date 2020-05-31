const getItemColor = (error, hasValue) => {
  let color = null;

  if (error) {
    color = '#B00020';
  }

  if (hasValue) {
    color = '#383d7f';
  }

  return color;
};

export default getItemColor;
