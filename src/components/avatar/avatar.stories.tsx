import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import Avatar from "./Avatar";

export default {
  title: "Example/Avatar",
  component: Avatar,
} as Meta;

const Template: Story = (args) => (
  <Avatar
    label={args.label}
    filled={args.filled}
    size={args.size}
    src={args.src}
  />
);

export const Primary = Template.bind({});
