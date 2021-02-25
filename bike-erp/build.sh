#!/bin/sh
npm start & (cd backend && (npm run dev & npm run authStart))