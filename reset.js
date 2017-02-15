module.exports = {
  'margin': '0',
  'padding': '0',
  'border': '0',
  'font-size': '100%',
  'font': 'inherit',
  'vertical-align': 'baseline',
  'display': 'inline-block',
  'line-height': '1',
  'list-style': 'none',
  'quotes': 'none',
  'background': 'transparent',
  'border-collapse': 'collapse',
  'border-spacing': '0',
  'text-decoration': 'none',
  '&:before': {
    'fallbacks': {
      content: '""',
    },
    'content': 'none',
  },
  '&:after': {
    'fallbacks': {
      content: '""',
    },
    'content': 'none',
  },
  '&:hover': {
    'text-decoration': 'none',
  },
  '&:focus': {
    'outline': '0',
  }
}
