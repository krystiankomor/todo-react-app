import React from 'react';
import { Card } from 'react-bootstrap';

export function Home() {
  return (
    <>
      <Card className={'mb-3'}>
        <Card.Body>
          <Card.Title>Project for developing advanced web apps</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>By Krystian Komor</Card.Subtitle>
          <Card.Text>
            This is a sample website build on react. Please check TO-DO app and enjoy it!
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className={'mb-3'}>
        <Card.Body>
          <Card.Title>Note for TO-DO app</Card.Title>
          <Card.Text>
            This app has not implemented any complex storage, just simple localStorage.
            Nevertheless it is a fully functional app.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}