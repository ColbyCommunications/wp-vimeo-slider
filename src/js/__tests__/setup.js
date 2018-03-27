const setUp = () => {
  if (window.matchMedia) {
    return;
  }

  window.matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {},
  });
};

setUp();
