const getItemColor = (error, hasValue, theme) => {
  let color = null;

  if (error) {
    color = theme.colors.error;
  }

  if (hasValue) {
    color = theme.colors.primary;
  }

  return color;
};

export default getItemColor;
