import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {Dashboard, dashboardLinks} from "../Dashboard";

describe('Dashboard', () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  it('renders the dashboard header', () => {
    renderDashboard();
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/Here\'s a quick look/i)).toBeInTheDocument();
  });

  it('renders quick stats correctly', () => {
    renderDashboard();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('renders all dashboard link cards with correct text and links', () => {
    renderDashboard();
    dashboardLinks.forEach((link) => {
      expect(screen.getByText(link.title)).toBeInTheDocument();
      expect(screen.getByText(link.description)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: new RegExp(`Go to ${link.title}`, 'i') })).toHaveAttribute('href', link.to);
    });
  });
});

