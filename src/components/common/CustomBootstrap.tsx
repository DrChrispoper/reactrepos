import React from 'react';
import { Col } from 'reactstrap';

interface PropsColxx {
  children: JSX.Element;
  xxs: string;
  className?: string;
  md?: string;
}

const Colxx = (props: PropsColxx) => (
  <Col {...props} widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']} />
);

interface PropsSep {
  className?: string;
}

const Separator = (props: PropsSep) => (
  <div className={`separator ${props.className}`}></div>
);
export { Colxx, Separator };
