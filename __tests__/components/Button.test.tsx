import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import {Button} from '../Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders left icon when provided', () => {
    render(<Button iconLeft={<span data-testid="left-icon">👈</span>}>Click</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders right icon when provided', () => {
    render(<Button iconRight={<span data-testid="right-icon">👉</span>}>Click</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies correct variant class (primary)', () => {
    const { container } = render(<Button variant="primary">Click</Button>);
    expect(container.querySelector('button')?.className).toContain('bg-primary');
  });

  it('applies correct size class (lg)', () => {
    const { container } = render(<Button size="lg">Click</Button>);
    expect(container.querySelector('button')?.className).toContain('text-lg');
  });
});

