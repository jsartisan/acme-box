import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="c-logo">
      <img src="/images/logo.svg" alt="AcmeBox" />
      <h2>AcmeBox</h2>
    </Link>
  );
}
