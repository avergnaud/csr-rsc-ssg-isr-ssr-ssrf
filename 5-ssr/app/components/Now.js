'use client';

import classes from './now.module.css';
import { useEffect, useState } from 'react';

export default function Now() {
    console.log('executing');

    const serverSideNow = Date.now();

    const [now, setNow] = useState(serverSideNow);

    useEffect(() => {
        setTimeout(() => {
            setNow(Date.now());
        }, 2000);
      }, []);

    return (
        <div className={classes.now}>
            Render Timestamp: {now}
        </div>
    );
}