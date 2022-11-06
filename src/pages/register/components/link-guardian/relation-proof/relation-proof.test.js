import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { RelationProof } from './index';

beforeEach(() => {
  render(
    <Router>
      <RelationProof />
    </Router>
  );
});

describe('user should have one or more member to link', () => {
  test('render login button initially', () => {
    const Card = screen.getAllByTestId('relation-card');
    expect(Card.length).toBeGreaterThan(0);
  });
});

describe('ABHA number should be present', () => {
  test('render login button initially', () => {
    const Card = screen.getAllByTestId('relation-card');
    expect(Card.length).toBeGreaterThan(0);
  });
});
describe('ABHA number should be present', () => {
  test('render login button initially', () => {
    const Card = screen.getAllByTestId('abhaNumber');
    expect(Card.length).toBeGreaterThan(0);
  });
});
describe('ABHA number should be present', () => {
  test('render login button initially', () => {
    const Card = screen.getAllByTestId('abhaName');
    expect(Card.length).toBeGreaterThan(0);
  });
});
describe('ABHA number should be present', () => {
  test('render login button initially', () => {
    const Card = screen.getAllByTestId('abhaAddress');
    expect(Card.length).toBeGreaterThan(0);
  });
});
