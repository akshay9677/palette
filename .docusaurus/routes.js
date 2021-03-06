
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/ComponentCard',
  component: ComponentCreator('/ComponentCard','434'),
  exact: true,
},
{
  path: '/Components',
  component: ComponentCreator('/Components','e65'),
  exact: true,
},
{
  path: '/components/EmptyState',
  component: ComponentCreator('/components/EmptyState','540'),
  exact: true,
},
{
  path: '/Foundations',
  component: ComponentCreator('/Foundations','790'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','12e'),
  
  routes: [
{
  path: '/docs/component-docs/Accordion',
  component: ComponentCreator('/docs/component-docs/Accordion','2ed'),
  exact: true,
},
{
  path: '/docs/component-docs/Alert',
  component: ComponentCreator('/docs/component-docs/Alert','a85'),
  exact: true,
},
{
  path: '/docs/component-docs/Avatar',
  component: ComponentCreator('/docs/component-docs/Avatar','711'),
  exact: true,
},
{
  path: '/docs/component-docs/Badge',
  component: ComponentCreator('/docs/component-docs/Badge','8e5'),
  exact: true,
},
{
  path: '/docs/component-docs/Button',
  component: ComponentCreator('/docs/component-docs/Button','bfe'),
  exact: true,
},
{
  path: '/docs/component-docs/Card',
  component: ComponentCreator('/docs/component-docs/Card','56b'),
  exact: true,
},
{
  path: '/docs/component-docs/Checkbox',
  component: ComponentCreator('/docs/component-docs/Checkbox','42b'),
  exact: true,
},
{
  path: '/docs/component-docs/DatePicker',
  component: ComponentCreator('/docs/component-docs/DatePicker','34a'),
  exact: true,
},
{
  path: '/docs/component-docs/Input',
  component: ComponentCreator('/docs/component-docs/Input','da3'),
  exact: true,
},
{
  path: '/docs/component-docs/Modal',
  component: ComponentCreator('/docs/component-docs/Modal','cff'),
  exact: true,
},
{
  path: '/docs/component-docs/Pagination',
  component: ComponentCreator('/docs/component-docs/Pagination','9e1'),
  exact: true,
},
{
  path: '/docs/component-docs/Popover',
  component: ComponentCreator('/docs/component-docs/Popover','737'),
  exact: true,
},
{
  path: '/docs/component-docs/Radio',
  component: ComponentCreator('/docs/component-docs/Radio','5ec'),
  exact: true,
},
{
  path: '/docs/component-docs/Select',
  component: ComponentCreator('/docs/component-docs/Select','222'),
  exact: true,
},
{
  path: '/docs/component-docs/SideSheet',
  component: ComponentCreator('/docs/component-docs/SideSheet','e56'),
  exact: true,
},
{
  path: '/docs/component-docs/Spinner',
  component: ComponentCreator('/docs/component-docs/Spinner','d3c'),
  exact: true,
},
{
  path: '/docs/component-docs/Tab',
  component: ComponentCreator('/docs/component-docs/Tab','06b'),
  exact: true,
},
{
  path: '/docs/component-docs/Table',
  component: ComponentCreator('/docs/component-docs/Table','ef3'),
  exact: true,
},
{
  path: '/docs/component-docs/TextArea',
  component: ComponentCreator('/docs/component-docs/TextArea','f51'),
  exact: true,
},
{
  path: '/docs/component-docs/TimePicker',
  component: ComponentCreator('/docs/component-docs/TimePicker','49e'),
  exact: true,
},
{
  path: '/docs/component-docs/Toast',
  component: ComponentCreator('/docs/component-docs/Toast','547'),
  exact: true,
},
{
  path: '/docs/component-docs/ToolTip',
  component: ComponentCreator('/docs/component-docs/ToolTip','fa9'),
  exact: true,
},
{
  path: '/docs/foundation/Color',
  component: ComponentCreator('/docs/foundation/Color','cf1'),
  exact: true,
},
{
  path: '/docs/foundation/Patterns',
  component: ComponentCreator('/docs/foundation/Patterns','986'),
  exact: true,
},
{
  path: '/docs/foundation/Typography',
  component: ComponentCreator('/docs/foundation/Typography','8a4'),
  exact: true,
},
{
  path: '/docs/getting-started/overview',
  component: ComponentCreator('/docs/getting-started/overview','d64'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
