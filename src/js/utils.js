/**
 * Remove unused props that are automatically passed to React Slick's buttons
 * and cause warning messages.
 * @param  {object} props The props passed from React Slick.
 * @return {object} fixedProps The props to send to the button components.
 */
export function removeTroublesomeArrowProps(props) {
  const troublesomeProps = ["currentSlide", "slideCount"];
  const fixedProps = {};

  Object.keys(props).forEach(key => {
    if (troublesomeProps.includes(key) === false) {
      fixedProps[key] = props[key];
    }
  });

  return fixedProps;
}
