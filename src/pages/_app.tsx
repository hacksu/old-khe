import 'styles/global.scss';
import '@style/Home';
import type { AppProps } from 'next/app'
import { StyledEngineProvider } from '@mui/material/styles';

import huh from 'theme';

console.log(huh);

function MyApp({ Component, pageProps }: AppProps) {
  return <StyledEngineProvider injectFirst>
    <Component {...pageProps} />
  </StyledEngineProvider>
}
export default MyApp
