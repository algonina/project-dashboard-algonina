import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactDOM,
} from 'react';
import PropTypes from 'prop-types';
const IndicatorContext = createContext();

export function ProviderLoading({ children }) {
  const [count, setCount] = useState(0);
  let visible = count > 0;
  useEffect(() => {
    const splashScreen = document.getElementById('splash-screen');
    const root = document.getElementsByTagName('body');
    const html = document.getElementsByTagName('html');

    splashScreen.classList.remove('hidden');

    // Show SplashScreen
    let timeout;
    if (splashScreen) {
      // splashScreen.classList.remove("hidden");
      if (!visible) {
        timeout = setTimeout(() => {
          root[0].style.setProperty('overflow', 'auto', 'important');
          html[0].style.setProperty('overflow', 'auto', 'important');
          splashScreen.classList.add('hidden');
        }, 3000);
      }
    }

    // Hide SplashScreen

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <IndicatorContext.Provider value={setCount}>
      {children}
    </IndicatorContext.Provider>
  );
}

export function Indicator() {
  const { active } = useContext(IndicatorContext);
  const [setPercent] = useState(0);
  useEffect(() => {
    // const splashScreen = document.getElementById("splash-screen");
    setTimeout(() => {
      setPercent((percent) => (percent < 100 ? percent + 10 : 100));
    }, 200);
  });
  return active ? <h1>Loading...</h1> : <h1>Loading...</h1>;
}

export function Loading({ visible = true }) {
  const setCount = useContext(IndicatorContext);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (setCount) {
      setCount((prev) => {
        return prev + 1;
      });
    }

    return () => {
      if (setCount) {
        setCount((prev) => {
          return prev - 1;
        });
      }
    };
  }, [setCount, visible]);

  return null;
}

Loading.propTypes = {
  visible: PropTypes.bool,
};
ProviderLoading.propTypes = {
  children: ReactDOM || PropTypes.any,
};
