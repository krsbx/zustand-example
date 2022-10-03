import {
  BoxProps,
  extendTheme,
  StackProps,
  StyleFunctionProps,
  ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {
  body: "'Ubuntu', sans-serif",
};

const components = {
  Textarea: {
    variants: {
      filled: (props: StyleFunctionProps) => ({
        transition: 'all 0.3s ease-in-out',
        bgColor: props.colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
        _hover: {
          bgColor: props.colorMode === 'light' ? 'whiteAlpha.700' : 'whiteAlpha.200',
        },
      }),
    },
  },
};

const theme = extendTheme({ config, fonts, components });

export const postTheme: BoxProps = {
  width: { base: 'base', sm: 'md' },
  p: 3,
  borderRadius: 'md',
  gap: 3,
  boxShadow: 'md',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  minWidth: '100%',
  minHeight: '125px',
};

export const commentTheme: BoxProps = {
  ...postTheme,
  minHeight: '75px',
};

export const cardInformationTheme: StackProps = {
  direction: 'row',
  spacing: 2,
  alignItems: 'center',
  fontWeight: 'bold',
};

export default theme;
